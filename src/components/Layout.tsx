import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail, ChevronDown, MapPin, Clock } from "lucide-react";
import { TURO_URL } from "@/data/vehicles";
import FAQSection from "@/components/Faq";
import { CONTACT_ADDRESS, CONTACT_EMAIL, CONTACT_PHONE } from "@/data/contact";

const serviceSubLinks = [
  { label: "AIRPORT SERVICE", to: "/services", hash: "airport" },
  { label: "STANDARD RENTAL", to: "/services", hash: "rentals" },
  { label: "CUSTOM DELIVERY", to: "/services", hash: "custom-delivery" },
  { label: "CORPORATE SERVICES", to: "/services", hash: "cooperate-service" },
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

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  const showFaqExtra = location.pathname !== "/faq";

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      
      {/* Wrapper with background image from FAQ section to Footer */}
      <div
        className="relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(2, 34, 19, 0.80), rgba(2, 34, 19, 0.85)), url('/vehicles/home-faq-image.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {showFaqExtra && <Extra />}
        <Footer />
      </div>
    </div>
  );
}

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
                  if (currentPath !== "/services") {
                    window.location.href = `/services#${child.hash}`;
                  } else {
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

  // Check if we're on a vehicle details page (e.g., /fleet/bmw-x6)
  const isVehicleDetailsPage = location.pathname !== '/fleet' && location.pathname.startsWith('/fleet/');

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

      if (currentScrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

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

  // Build header classes
  let headerClasses = "fixed top-0 left-0 right-0 z-50 transition-all duration-500 transform ";
  headerClasses += isVisible ? "translate-y-0" : "-translate-y-full";
  
  if (isVehicleDetailsPage) {
    // Dark green background for vehicle details pages
    headerClasses += " bg-[#1a3a2a] border-b border-white/10";
  } else if (scrolled) {
    // Translucent black with blur for scrolled state on other pages
    headerClasses += " bg-black/40 backdrop-blur-md shadow-lg";
  } else {
    // Transparent for top of other pages
    headerClasses += " bg-transparent";
  }

  return (
    <header className={headerClasses}>
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
                          if (location.pathname !== "/services") {
                            window.location.href = `/services#${child.hash}`;
                          } else {
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

  return (
    <footer className="relative bg-transparent text-secondary-foreground overflow-hidden">
      <div className="border-t-2 border-border/60 z-10" />

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
          <div className="lg:pr-10">
            <p className="text-sm leading-relaxed text-secondary-foreground/70 mb-4">
              Premium car rentals across Atlanta, built around convenience, flexibility, and a professionally maintained fleet.
            </p>

            {/* <div className="flex items-center gap-1 text-xs text-secondary-foreground/50 mb-4">
              <MapPin className="h-3 w-3 shrink-0" />
              <span>Atlanta • Open 7 days a week</span>
            </div> */}

            <div className="flex gap-3">
              {[
                { label: "Instagram", href: "#", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
                { label: "Facebook", href: "#", icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
                { label: "X", href: "#", icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.729-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
                { label: "LinkedIn", href: "#", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
                { label: "TikTok", href: "#", icon: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" },
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

            <div className="flex flex-col gap-2">
              <a href={`tel:${CONTACT_PHONE.replace(/[^+\d]/g, "")}`} className="flex items-center gap-2 text-sm text-secondary-foreground/70 hover:text-secondary-foreground">
                <Phone className="h-4 w-4 shrink-0" />
                {CONTACT_PHONE}
              </a>

              <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-2 text-sm text-secondary-foreground/70 hover:text-secondary-foreground">
                <Mail className="h-4 w-4 shrink-0" />
                {CONTACT_EMAIL}
              </a>

              <div className="flex items-start gap-2 text-sm text-secondary-foreground/70">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed">{CONTACT_ADDRESS}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-secondary-foreground/70">
                <Clock className="h-4 w-4 shrink-0" />
                Open daily by reservation
              </div>
            </div>

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
