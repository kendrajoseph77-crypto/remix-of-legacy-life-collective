import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-black/60 backdrop-blur-md shadow-lg py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-24">
        <Link to="/" className="flex items-center group">
          <Logo darkBg />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
