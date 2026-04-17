import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail, ChevronDown, MapPin, Clock, ExternalLink } from "lucide-react";
import { TURO_URL } from "@/data/vehicles";
import FAQSection from "@/components/Faq";

const PHONE = "(470) 817-6427";
const EMAIL = "ceo@meadgreenautos.com";
const ADDRESS = "4814 Old National Hwy , Atlanta, GA 30337";

const serviceSubLinks = [
  { label: "AIRPORT SERVICE", to: "/services", hash: "airport" },
  { label: "STANDARD RENTAL", to: "/services", hash: "rentals" },
  { label: "CUSTOM DELIVERY", to: "/services", hash: "custom-delivery" },
  { label: "CO-OPERATE SERVICES", to: "/services", hash: "cooperate-service" },
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
  const location = useLocation();

  // Scroll to top on every route change (except when navigating to hash links)
  useEffect(() => {
    // Only scroll to top if there's no hash in the URL
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Extra />
      <Footer />
    </div>
  );
}

// ... rest of your components (NavItem, Navbar, Extra, Footer)

function NavItem({ link, currentPath }: { link: typeof navLinks[0]; currentPath: string }) {
  const [open, setOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isActive = currentPath === link.to || (link.to !== "/" && currentPath.startsWith(link.to));

  const show = () => { if (timerRef.current) clearTimeout(timerRef.current); setOpen(true); };
  const hide = () => { timerRef.current = setTimeout(() => setOpen(false), 150); };

  const handleScrollToSection = (hash: string) => {
    const element = document.getElementById(hash);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <Link
        to={link.to}
        onClick={(e) => {
          if (link.children) {
            e.preventDefault();
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
                onClick={(e) => {
                  e.preventDefault();
                  // Navigate to services page first if not already there
                  if (currentPath !== "/services") {
                    window.location.href = `/services#${child.hash}`;
                  } else {
                    // Already on services page, just scroll
                    handleScrollToSection(child.hash);
                  }
                  setOpen(false);
                }}
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

  // Check if we're on the VehicleDetails dynamic page
  const isVehicleDetailsPage = location.pathname.startsWith('/fleet/') && location.pathname !== '/fleet';

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

  // Handle hash links when navigating to services page
  useEffect(() => {
    if (location.pathname === "/services" && location.hash) {
      const hash = location.hash.replace('#', '');
      const element = document.getElementById(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  // Determine navbar background classes based on page and scroll state
  let navbarBgClasses = "";
  
  if (isVehicleDetailsPage) {
    // Always dark green background on vehicle details page, regardless of scroll
    navbarBgClasses = "bg-stone border-b border-white/10";
  } else if (scrolled) {
    // Translucent Black when scrolling up on other pages
    navbarBgClasses = "bg-black/40 backdrop-blur-md shadow-lg";
  } else {
    // Transparent at the very top on other pages
    navbarBgClasses = "bg-transparent";
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 transform ${isVisible ? "translate-y-0" : "-translate-y-full"
        } ${navbarBgClasses}`}
    >
      {/* FIX 1: Added px-4 md:px-6 to match footer's horizontal spacing */}
      <div className="mx-auto max-w-6xl px-4 md:px-1 flex h-16 items-center justify-between md:h-20">
        <Link to="/" className="flex items-center gap-2 select-none">
          <img
            src="/MGA-FULL-LOGO.svg"
            alt="Mead Green Autos Logo"
            className="h-[20px] w-auto md:h-[30px]"
          />
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
          {/* FIX 2: Added px-4 md:px-6 to mobile menu as well */}
          <nav className="mx-auto max-w-6xl px-4 md:px-1 flex flex-col gap-1 py-4">
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
                        onClick={(e) => {
                          e.preventDefault();
                          setOpen(false);
                          // Navigate to services page first if not already there
                          if (location.pathname !== "/services") {
                            window.location.href = `/services#${child.hash}`;
                          } else {
                            // Already on services page, just scroll
                            const element = document.getElementById(child.hash);
                            if (element) {
                              element.scrollIntoView({ behavior: "smooth" });
                            }
                          }
                        }}
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
  const location = useLocation();

  const handleScrollToForm = () => {
    if (location.pathname !== "/services") {
      window.location.href = "/services#service-form";
    } else {
      const element = document.getElementById("service-form");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleScrollToSection = (hash: string) => {
    if (location.pathname !== "/services") {
      window.location.href = `/services#${hash}`;
    } else {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

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

      {/* FIX 3: Added px-4 md:px-6 to match navbar exactly <div className="mx-auto max-w-6xl px-4 md:px-1 py-8 md:py-12"> */}
      <div className="mx-auto max-w-6xl pl-4 md:pl-1 pr-0 py-8 md:py-12">
        
      
        
        {/* Logo */}
        <div className="mb-3">
          <img
            src="/MGA-SHORT-LOGO-Round.svg"
            alt="Mead Green Autos Logo"
            className="h-[30px] w-auto md:h-[40px]"
          />
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[2.5fr_1fr_1fr_2.0fr] gap-2 gap-y-8 lg:gap-y-2">

          {/* Column 1 */}
            <div className="lg:pr-10">  {/* Add this class */}
            <p className="text-sm leading-relaxed text-secondary-foreground/70 mb-4">
              Premium car rentals serving the greater Atlanta area. Flexible, all-day rentals with well-maintained vehicles and consistently 5-star-rated service.
            </p>

            <div className="flex items-center gap-1 text-xs text-secondary-foreground/50 mb-4">
              <MapPin className="h-3 w-3 shrink-0" />
              <span>Atlanta • Open 7 days a week</span>
            </div>

            <div className="flex gap-3">
              {[
                { label: "Instagram", href: "#", icon: "M12 2.163c3.204..." },
                { label: "Facebook", href: "#", icon: "M24 12.073..." },
                { label: "X", href: "#", icon: "M18.244 2.25..." },
                { label: "LinkedIn", href: "#", icon: "M20.447 20.452..." },
                { label: "TikTok", href: "#", icon: "M12.525.02..." },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-sm text-secondary-foreground/40 hover:text-secondary-foreground/80"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-secondary-foreground/50">
              Quick Links
            </h4>

            <nav className="flex flex-col gap-2">
              {navLinks?.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm text-secondary-foreground/70 hover:text-secondary-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3 */}
         <div className="lg:pr-8"> 
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-secondary-foreground/50">
              Resources
            </h4>

            <nav className="flex flex-col gap-2">
              {/* FIX 4: Replaced gap-2 with consistent spacing */}
              <Link to="/policies" className="text-sm text-secondary-foreground/70 hover:text-secondary-foreground">
                Policies & Terms
              </Link>
              <Link to="/insurance" className="text-sm text-secondary-foreground/70 hover:text-secondary-foreground">
                Insurance Information
              </Link>
              <a href={TURO_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-secondary-foreground/70 hover:text-secondary-foreground">
                Book on Turo
              </a>
            </nav>
          </div>

          {/* Column 4 */}
         <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-secondary-foreground/50">
              Contact
            </h4>

            {/* FIX 5: Changed from gap-3 to gap-2 for visual consistency across all columns */}
            <div className="flex flex-col gap-2">
              <a href="tel:+14708176427" className="flex items-center gap-2 text-sm text-secondary-foreground/70 hover:text-secondary-foreground">
                <Phone className="h-4 w-4 shrink-0" />
                {PHONE}
              </a>

              <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 text-sm text-secondary-foreground/70 hover:text-secondary-foreground">
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

            {/* FIX 6: Changed from gap-2 to gap-3 for better visual separation from contact info */}
            <div className="mt-6 flex flex-col gap-3">
              <button 
                onClick={handleScrollToForm}
                className="text-left text-xs font-semibold uppercase tracking-widest text-gold hover:text-gold/80"
              >
                BOOK DIRECT
              </button>

              <a href={TURO_URL} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold uppercase tracking-widest text-secondary-foreground/50 hover:text-secondary-foreground">
                BOOK ON TURO
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-secondary-foreground/10 pt-8 text-center">
          <p className="text-xs text-secondary-foreground/40">
            © {new Date().getFullYear()} Mead Green Autos. All rights reserved. Atlanta, Georgia.
          </p>
        </div>
      </div>
    </footer>
  );
}
