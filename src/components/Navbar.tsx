import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "@/components/Logo";
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
    { label: "How it Works", path: "/#how-it-works" },
    { label: "Join Us", path: "/#join" },
    { label: "Login", path: "/login" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center group">
          <Logo variant={scrolled ? "dark" : "light"} />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.label === "Login" ? (
              <Link
                key={link.label}
                to={link.path}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
                  scrolled ? "text-muted-foreground hover:text-foreground" : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ) : link.label === "Join Us" ? (
              <a
                key={link.label}
                href={link.path}
                className="px-6 py-2.5 rounded-lg text-sm font-semibold tracking-wide btn-coral"
              >
                Contact Us
              </a>
            ) : (
              <a
                key={link.label}
                href={link.path}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
                  scrolled ? "text-muted-foreground hover:text-foreground" : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            )
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden ${scrolled ? "text-foreground" : "text-white"}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden glass mt-2 mx-4 rounded-lg p-6 flex flex-col gap-4">
          {navLinks.map((link) =>
            link.path.startsWith("/#") ? (
              <a
                key={link.label}
                href={link.path}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium tracking-wide transition-colors text-foreground/70 hover:text-foreground"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium tracking-wide transition-colors text-foreground/70 hover:text-foreground"
              >
                {link.label}
              </Link>
            )
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
