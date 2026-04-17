function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const location = useLocation();

  // Debug: log the current path to see what we're getting
  console.log("Current path:", location.pathname);
  
  // Check if we're on the VehicleDetails dynamic page
  const isVehicleDetailsPage = location.pathname.match(/^\/fleet\/[^/]+$/) !== null;
  console.log("Is vehicle details page:", isVehicleDetailsPage);

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

  // Determine the classes based on the page
  let headerClasses = "fixed top-0 left-0 right-0 z-50 transition-all duration-500 transform ";
  headerClasses += isVisible ? "translate-y-0" : "-translate-y-full";
  
  if (isVehicleDetailsPage) {
    // On vehicle details page - use dark green background
    headerClasses += " bg-[#1a3a2a] border-b border-white/10";
  } else if (scrolled) {
    // On other pages when scrolled
    headerClasses += " bg-black/40 backdrop-blur-md shadow-lg";
  } else {
    // On other pages at the top
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
