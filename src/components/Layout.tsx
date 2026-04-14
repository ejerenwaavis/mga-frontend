import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail, ChevronDown, MapPin, Clock, ExternalLink } from "lucide-react";
import { TURO_URL } from "@/data/vehicles";
import FAQSection from "@/components/Faq";

const PHONE = "(470) 817-6427";
const EMAIL = "ceo@meadgreenautos.com";
const ADDRESS = "4814 Old National Hwy , Atlanta, GA 30337";
// const YELP_URL = "https://www.yelp.com/biz/mead-green-autos-atlanta";

const serviceSubLinks = [
  { label: "AIRPORT SERVICE", to: "/services#airport" },
  { label: "STANDARD RENTAL", to: "/services#rentals" },
  // { label: "LONG-TERM RENTAL", to: "/services#long-term" },
  { label: "CUSTOM DELIVERY", to: "/services#corporate" },
  { label: "CO-OPERATE SERVICES", to: "/services#concierge" },
];

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Fleet", to: "/fleet" },
  { label: "Services", to: "/services", children: serviceSubLinks },
  { label: "About Us", to: "/about" },
   { label: "FAQs", to: "/faq" },
  { label: "Contact", to: "/contact" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Extra />
      <Footer />
    </div>
  );
}

function NavItem({ link, currentPath }: { link: typeof navLinks[0]; currentPath: string }) {
  const [open, setOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isActive = currentPath === link.to || (link.to !== "/" && currentPath.startsWith(link.to));

  const show = () => { if (timerRef.current) clearTimeout(timerRef.current); setOpen(true); };
  const hide = () => { timerRef.current = setTimeout(() => setOpen(false), 150); };

  return (
    <div className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <Link
        to={link.to}
        onClick={(e) => {
          if (link.to.startsWith("#") || link.to.includes("#")) {
            const id = link.to.split("#")[1];
            const element = document.getElementById(id);
            if (element) {
              e.preventDefault(); // Prevent default jump
              element.scrollIntoView({ behavior: "smooth" });
            }
          }
        }}
        className={`nav-hover-link flex items-center gap-1 text-xs font-sans font-medium uppercase tracking-widest transition-colors duration-150 hover:text-gold ${isActive ? "text-white active" : "text-white"
          }`}
      >
        {link.label}
        {link.children && (
          <ChevronDown className={`h-3 w-3 transition-transform duration-150 ${open ? "rotate-180" : ""}`} />
        )}
      </Link>
      {link.children && (
        <div
          className="absolute left-0 top-full pt-2 z-[200]"
          style={{ pointerEvents: open ? "auto" : "none" }}
        >
          <div
            className={`min-w-[220px] rounded-lg border border-border p-2 transition-all duration-150 ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none"
              }`}
            style={{
              backgroundColor: "hsl(var(--background))",
              boxShadow: "0 8px 32px -4px hsl(var(--foreground) / 0.12), 0 2px 8px -2px hsl(var(--foreground) / 0.08)",
            }}
          >
            {link.children.map((child) => (
              <Link
                key={child.to}
                to={child.to}
                className="block rounded-md px-3 py-2.5 text-[10px] font-sans font-semibold uppercase tracking-widest text-muted-foreground transition-colors duration-150 hover:text-foreground"
                style={{ transition: "background-color 150ms ease-out, color 150ms ease-out" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "hsl(var(--muted))"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
              >
                {child.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setExpandedMobile(null);
  }, [location.pathname]);

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      // 1. Handle Translucency (Scrolled state)
      if (currentScrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // 2. Handle Direction (Visibility state)
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling Down - Hide
        setIsVisible(false);
      } else {
        // Scrolling Up - Show
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b border-white/10 transition-all duration-500 transform ${isVisible ? "translate-y-0" : "-translate-y-full"
        } ${scrolled
          ? "bg-black/40 backdrop-blur-md shadow-lg" // Translucent Black when scrolling up
          : "bg-transparent" // Transparent at the very top
        }`}
    >
      <div className="container flex h-16 items-center justify-between md:h-20">
        {/* <Link to="/" className="flex items-center gap-2 select-none">
          <span
            className="font-serif text-[1.15rem] font-semibold uppercase tracking-tight md:text-[1.3rem]"
            style={{ color: "hsl(var(--primary))" }}
          >
            Mead Green Autos
            
          </span>
        </Link> */}
        <Link to="/" className="flex items-center gap-2 select-none">
          {/* The Image replaces the <span> */}
          <img
            src="/MGA-FULL-LOGO.svg"
            alt="Mead Green Autos Logo"
className="h-[100px] w-auto md:h-[100px]"  // 90% of original size
          // h-8 (32px) for mobile, md:h-10 (40px) for desktop
          />
          {/* <span
            className="font-serif text-[1.15rem] font-semibold tracking-tight md:text-[1.3rem]"
            style={{ color: "hsl(var(--primary))" }}
          > */}
          {/* <span
            className="font-serif text-[1.15rem] font-semibold tracking-tight md:text-[1.3rem]"
            style={{ color: "white" }}
          >
            Mead Green Autos

          </span> */}
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <NavItem key={link.to} link={link} currentPath={location.pathname} />
          ))}
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="inline-flex items-center justify-center rounded-sm p-2 text-white lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/50 bg-background lg:hidden animate-fade-in">
          <nav className="container flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <div key={link.to}>
                <div className="flex items-center">
                  <Link
                    to={link.to}
                    onClick={() => !link.children && setOpen(false)}
                    className={`flex-1 rounded-sm px-3 py-2.5 text-xs font-sans font-medium uppercase tracking-widest transition-colors hover:bg-muted ${location.pathname === link.to ? "text-white" : "text-white"
                      }`}
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <button
                      onClick={() => setExpandedMobile(expandedMobile === link.to ? null : link.to)}
                      className="px-3 py-2.5 text-white"
                    >
                      <ChevronDown className={`h-3 w-3 transition-transform ${expandedMobile === link.to ? "rotate-180" : ""}`} />
                    </button>
                  )}
                </div>
                {link.children && expandedMobile === link.to && (
                  <div className="ml-4 flex flex-col gap-1 pb-2">
                    {link.children.map((child) => (
                      <Link
                        key={child.to}
                        to={child.to}
                        onClick={() => setOpen(false)}
                        className="rounded-sm px-3 py-2 text-[10px] font-sans font-semibold uppercase tracking-widest text-white transition-colors hover:bg-muted hover:text-foreground"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function Extra() {
  return (
    <section id="faqs" className="scroll-mt-20">
      <FAQSection />
    </section>
  )
}
function Footer() {
  return (
    <footer
      className="relative bg-secondary text-secondary-foreground overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(2, 34, 19, 0.80), rgba(2, 34, 19, 0.85)), url('/nat4.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="border-t-2 border-border/60 z-10" />
      <div className="container px-4 md:px-6 py-8 md:py-12">
        {/* Logo */}
        <div className="mb-6">
          <img
            src="/MGA-SHORT-LOGO-Round.svg"
            alt="Mead Green Autos Logo"
            className="h-14 w-auto md:h-18"
          />
        </div>

        {/* Second Row - FIXED SPACING */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          
          {/* Column 1 - Description (spans full width on mobile, normal on desktop) */}
          <div className="lg:col-span-1">
            <p className="text-sm leading-relaxed text-secondary-foreground/70 mb-3">
              Premium car rentals serving the greater Atlanta area. Flexible, all-day rentals with well-maintained vehicles and consistently 5-star-rated service.
            </p>
            <div className="flex items-center gap-1 text-xs text-secondary-foreground/50">
              <MapPin className="h-3 w-3 shrink-0" />
              <span>Atlanta &bull; Open 7 days a week</span>
            </div>
            <div className="mt-4 flex gap-3">
              {[
                { label: "Instagram", href: "#", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
                { label: "Facebook", href: "#", icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
                { label: "X", href: "#", icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
                { label: "LinkedIn", href: "#", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
                { label: "TikTok", href: "#", icon: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-sm text-secondary-foreground/40 transition-colors hover:text-secondary-foreground/80"
                  aria-label={social.label}
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="mb-4 text-xs font-sans font-semibold uppercase tracking-widest text-secondary-foreground/50">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm text-secondary-foreground/70 transition-colors hover:text-secondary-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3 - Resources */}
          <div>
            <h4 className="mb-4 text-xs font-sans font-semibold uppercase tracking-widest text-secondary-foreground/50">
              Resources
            </h4>
            <nav className="flex flex-col gap-2">
              <Link to="/policies" className="text-sm text-secondary-foreground/70 transition-colors hover:text-secondary-foreground">
                Policies & Terms
              </Link>
              <Link to="/insurance" className="text-sm text-secondary-foreground/70 transition-colors hover:text-secondary-foreground">
                Insurance Information
              </Link>
              <a href={TURO_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-secondary-foreground/70 transition-colors hover:text-secondary-foreground">
                Book on Turo
              </a>
            </nav>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h4 className="mb-4 text-xs font-sans font-semibold uppercase tracking-widest text-secondary-foreground/50">
              Contact
            </h4>
            <div className="flex flex-col gap-3">
              <a href="tel:+14708176427" className="flex items-center gap-2 text-sm text-secondary-foreground/70 transition-colors hover:text-secondary-foreground">
                <Phone className="h-4 w-4 shrink-0" />
                {PHONE}
              </a>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 text-sm text-secondary-foreground/70 transition-colors hover:text-secondary-foreground">
                <Mail className="h-4 w-4 shrink-0" />
                {EMAIL}
              </a>
              <div className="flex items-start gap-2 text-sm text-secondary-foreground/70">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed">{ADDRESS}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-secondary-foreground/70">
                <Clock className="h-4 w-4 shrink-0" />
                Open 7 days a week
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-2">
              <Link to="/services" className="text-xs font-sans font-semibold uppercase tracking-widest text-gold transition-colors hover:text-gold/80">
                BOOK DIRECT
              </Link>
              <a href={TURO_URL} target="_blank" rel="noopener noreferrer" className="text-xs font-sans font-semibold uppercase tracking-widest text-secondary-foreground/50 transition-colors hover:text-secondary-foreground">
                BOOK ON TURO
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-secondary-foreground/10 pt-8 text-center">
          <p className="text-xs text-secondary-foreground/40">
            &copy; {new Date().getFullYear()} Mead Green Autos. All rights reserved. Atlanta, Georgia.
          </p>
        </div>
      </div>
    </footer>
  );
}
