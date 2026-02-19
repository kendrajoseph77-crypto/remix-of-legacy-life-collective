import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logoIcon from "@/assets/logo-icon.png";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "How It Works", path: "/how-it-works" },
    { label: "Join Us", path: "/join" },
    { label: "Login", path: "/login" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logoIcon} alt="coop5050Life Logo" className="h-10 w-10 object-contain" />
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-bold tracking-wider" style={{ fontFamily: "'Playfair Display', serif" }}>
              <span className="gold-gradient">coop</span>
              <span className="text-foreground">5050</span>
              <span className="cyan-gradient">Life</span>
              <span className="text-xs align-super text-muted-foreground">™</span>
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.label === "Join Us" ? (
              <Link
                key={link.label}
                to={link.path}
                className="px-6 py-2 rounded-sm text-sm font-semibold tracking-widest uppercase transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, hsl(45 95% 55%), hsl(35 100% 65%))",
                  color: "hsl(220 20% 5%)",
                }}
              >
                Join Us
              </Link>
            ) : (
              <Link
                key={link.label}
                to={link.path}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden glass mt-2 mx-4 rounded-lg p-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium tracking-wide transition-colors ${
                link.label === "Join Us" ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
