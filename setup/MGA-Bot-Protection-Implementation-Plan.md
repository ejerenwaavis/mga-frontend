# MGA Booking Form — Bot/Spam Protection Implementation Plan (Self-Hosted Stack)

## Why this is happening
This is generic, automated internet-scanning traffic — not an attack targeted at
"car rental" specifically. Any public form (booking, contact, signup) that accepts
POST data and responds with success gets found by bots within days of going live,
especially once the URL is indexed or reachable via scanners like Shodan or basic
form-fuzzing tools. The garbled names + real-looking emails + junk "Notes/Subject"
text are consistent with automated fuzzing bots — likely testing whether the form
will accept and "validate" stolen identity/email data (does it trigger a
confirmation email, does it accept without verification), which is valuable
groundwork for later fraud, or simple spam-bot probing.

The two structural weaknesses being exploited:
1. No bot-gating on the form (no CAPTCHA, no honeypot, no rate limit).
2. The endpoint appears to fire a notification/confirmation email on every
   submission with no validation first — this is what makes it attractive to abuse
   (it "confirms" arbitrary emails are live and reachable).

## Approach: fully self-hosted, single management model
No third-party accounts, no external API calls, nothing leaves the DigitalOcean
droplet. Everything below runs on infrastructure you already control and can
inspect/modify directly.

## Fix priority
1. Honeypot field (near-zero effort, kills most bots, self-hosted)
2. Time-trap (near-zero effort, self-hosted)
3. ALTCHA — self-hosted proof-of-work CAPTCHA (frontend widget + your own backend verifier, no external service)
4. Rate limiting in Express (backend code, self-hosted)
5. Nginx-level rate limiting on the droplet (network layer, self-hosted, catches traffic before it reaches Node)
6. Field validation / reject junk submissions before emailing
7. *(Optional, later)* Cloudflare as an additional edge layer — not required, self-hosted stack alone stops this

---

## Step 1 — Nginx rate limiting on the droplet (do this first, no app code, ~10 min)

If Nginx is the reverse proxy in front of your Node app on the droplet (standard
DO setup), add rate limiting at the web server level — this blocks flood traffic
before it even reaches your Node process.

In the `http` block of `/etc/nginx/nginx.conf`:
```nginx
limit_req_zone $binary_remote_addr zone=booking_limit:10m rate=5r/m;
```

In the server block / location for the booking API path (adjust path to match
the real endpoint):
```nginx
location /api/bookings {
    limit_req zone=booking_limit burst=3 nodelay;
    proxy_pass http://localhost:3000; # or whatever port the Node app runs on
}
```

Then:
```bash
sudo nginx -t && sudo systemctl reload nginx
```

This caps each IP to 5 requests/minute on that path, with a small burst allowance
for real users double-clicking submit.

---

## Local Development — Execution Checklist

**What the Copilot agent does (in your local repo, Step 2 prompt below):**
- Installs dependencies, creates middleware files, wires up routes, adds the
  ALTCHA widget to the frontend form.

**What only you can do (agent can't touch these):**

1. **Generate the secret and create `.env`** — before running the agent, or
   right after, create/edit `mga-backend/.env` and add:
   ```
   ALTCHA_HMAC_KEY=<paste your generated 64-char string here>
   ```
   Generate it yourself locally with:
   ```
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
   Confirm `.env` is already in `mga-backend/.gitignore` — if not, add it before
   committing anything, so the key never lands in GitHub.

2. **Install and test locally** after the agent finishes:
   ```
   cd mga-backend && npm install
   cd ../mga-frontend && npm install
   ```
   Run both dev servers, submit the booking form yourself, and confirm:
   - A normal submission still succeeds (ALTCHA widget solves silently, no user
     action needed).
   - The honeypot field is genuinely invisible and doesn't block real submissions.
   - Rate limiting doesn't trip on a single normal user session.

3. **Commit and push to the repo** the agent doesn't have deploy access —
   review the diff, commit, push to whatever branch you deploy from.

4. **Deploy to the DigitalOcean droplet** — pull the latest code on the server,
   restart the Node process (pm2/systemd, whatever you're running), and add the
   *same* `ALTCHA_HMAC_KEY` to the production `.env` on the droplet (generate a
   separate one for prod, don't reuse the local dev key).

5. **Nginx config change (Step 1, server-side)** — this lives on the droplet,
   not in the repo. SSH in, edit `/etc/nginx/nginx.conf` and the site's server
   block as shown in Step 1 above, then:
   ```
   sudo nginx -t && sudo systemctl reload nginx
   ```
   `nginx -t` first to catch syntax errors before reloading — if it reloads
   with a bad config it can take the whole site down.

6. **Verify in production** — submit a real test booking on the live site,
   confirm you get the internal notification email and the customer would too
   (once you re-enable that per your own review), then watch the inbox for a
   day to confirm bot volume actually drops.

---

## Step 2 — Agent-ready backend patch (Express/Node assumed — confirm actual stack)

```
Context: mga-backend is a Node/Express API, mga-frontend is a Vite/React app.
The backend has a booking submission endpoint (likely something like
POST /api/bookings or /api/support) that currently accepts any submitted data
and immediately sends a notification/confirmation email. This endpoint is being
hit by spam/fraud bots submitting fake data. Implement layered, fully self-hosted
protection — no third-party CAPTCHA services, no external API calls — without
breaking real customer bookings.

Tasks:

1. Install dependencies:
   Backend: npm install express-rate-limit altcha-lib
   Frontend: npm install altcha

2. Add a rate limiter middleware in a new file src/middleware/rateLimiter.js:

   const rateLimit = require('express-rate-limit');

   const bookingLimiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 5, // max 5 submissions per IP per window
     standardHeaders: true,
     legacyHeaders: false,
     message: { error: 'Too many requests. Please try again later.' },
   });

   module.exports = { bookingLimiter };

   Apply this middleware to the booking/support submission route(s) only.

3. Add honeypot + time-trap validation in src/middleware/antiSpam.js:

   function antiSpamCheck(req, res, next) {
     const { hp_field, form_loaded_at } = req.body;

     // Honeypot: real users never fill this hidden field
     if (hp_field && hp_field.trim() !== '') {
       // Silently accept-looking response, but don't process or email
       return res.status(200).json({ success: true });
     }

     // Time-trap: reject submissions completed too fast to be human
     if (form_loaded_at) {
       const elapsed = Date.now() - Number(form_loaded_at);
       if (elapsed < 3000) {
         return res.status(200).json({ success: true }); // fake success, silently drop
       }
     }

     next();
   }

   module.exports = { antiSpamCheck };

4. Add field-validity checks before sending any notification email — reject
   (silently, with a 200 fake-success response so bots don't learn what
   triggers rejection) if:
   - pickup date AND drop-off date AND vehicle are ALL missing/N/A, OR
   - phone number fails a basic format check (10-15 digits), OR
   - email fails standard email regex validation

   Add this as src/middleware/validateBooking.js and apply before the email-send
   step in the booking controller.

5. In the booking route file, apply middleware in this order:
   router.post('/bookings', antiSpamCheck, bookingLimiter, validateBooking, bookingController.create);

6. In the frontend booking form (mga-frontend), add two hidden fields:
   - A honeypot input named hp_field, visually hidden via CSS (not display:none —
     use position:absolute; left:-9999px; so bots that check for display:none
     don't just skip it), with no label, tabIndex={-1}, autoComplete="off".
   - A hidden input form_loaded_at set via JS to Date.now() when the form mounts,
     submitted along with the rest of the form data.

7. Add ALTCHA (self-hosted proof-of-work CAPTCHA — no external service, no
   third-party account, verified entirely on our own server):

   Backend — src/routes/altcha.js (new route to issue challenges):
   ```js
   const express = require('express');
   const { createChallenge } = require('altcha-lib');
   const router = express.Router();

   router.get('/altcha-challenge', async (req, res) => {
     const challenge = await createChallenge({
       hmacKey: process.env.ALTCHA_HMAC_KEY, // set a long random string in .env
       maxNumber: 100000, // difficulty tuning
     });
     res.json(challenge);
   });

   module.exports = router;
   ```
   Mount this route in the main app file: `app.use('/api', require('./routes/altcha'));`

   Backend — in validateBooking.js, verify the solved payload before proceeding:
   ```js
   const { verifySolution } = require('altcha-lib');

   async function verifyAltcha(req, res, next) {
     const payload = req.body.altcha;
     if (!payload) {
       return res.status(200).json({ success: true }); // fake success, drop silently
     }
     const ok = await verifySolution(payload, process.env.ALTCHA_HMAC_KEY);
     if (!ok) {
       return res.status(200).json({ success: true }); // fake success, drop silently
     }
     next();
   }

   module.exports = { validateBooking, verifyAltcha };
   ```

   Frontend — in the booking form component:
   ```jsx
   import 'altcha';
   // ...
   <altcha-widget
     challengeurl="/api/altcha-challenge"
     name="altcha"
   ></altcha-widget>
   ```
   (Requires `npm install altcha` and importing it once at app entry so the
   `<altcha-widget>` custom element is registered.)

   Update the route middleware order to include verifyAltcha:
   router.post('/bookings', antiSpamCheck, bookingLimiter, verifyAltcha, validateBooking, bookingController.create);

8. Do NOT send an automatic confirmation email to the customer-provided address
   until after these checks pass. Keep the internal admin notification email
   but only fire it after validateBooking passes.

9. Log rejected/dropped submissions (IP, timestamp, reason) to a simple
   spamLog collection or file for visibility — don't just silently vanish them,
   so we can review volume and adjust thresholds later.

Environment: add ALTCHA_HMAC_KEY=<a long random secret string> to the backend
.env file — this stays entirely on our own server, nothing is sent externally.

Deliverable: booking endpoint hardened with honeypot, time-trap, ALTCHA
proof-of-work verification, rate limiting, and field validation — all self-hosted,
with rejected bot submissions silently dropped (fake 200 response) rather than
erroring, and internal email only fires on valid submissions.
```

---

## Optional, later — Cloudflare as an additional edge layer

Not required. The self-hosted stack above (Nginx + honeypot + time-trap + ALTCHA
+ rate limiting) fully addresses what you're currently seeing on its own. If spam
volume is still meaningful after deploying it, Cloudflare's free tier can sit in
front of the droplet's DNS as an extra network-edge layer later — but it's a
"nice to have," not a dependency, and keeps you outside the single-management-model
you want for now.

---

## What I need to make this exact instead of assumed

I assumed Express/Node for mga-backend based on your usual stack — confirm, and
share the actual booking route file (controller + route) plus confirmation of
where Nginx config lives on the droplet, so the middleware order, field names,
and Nginx paths match your real setup instead of placeholders.
