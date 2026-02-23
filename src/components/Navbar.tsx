import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-white shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center group">
          <Logo variant={scrolled ? "dark" : "light"} />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/login"
            className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
              scrolled ? "text-muted-foreground hover:text-foreground" : "text-white/80 hover:text-white"
            }`}
          >
            Login
          </Link>
          <a
            href="#join"
            className="px-6 py-2.5 rounded-lg text-sm font-semibold tracking-wide btn-coral"
          >
            Get Started
          </a>
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
        <div className="md:hidden bg-white shadow-lg mt-2 mx-4 rounded-lg p-6 flex flex-col gap-4">
          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="text-sm font-medium tracking-wide text-foreground/70 hover:text-foreground"
          >
            Login
          </Link>
          <a
            href="#join"
            onClick={() => setMenuOpen(false)}
            className="text-sm font-semibold tracking-wide btn-coral px-4 py-2.5 rounded-lg text-center"
          >
            Get Started
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
