import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import VibeLogo from "./VibeLogo";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface NavItemProps {
  href: string;
  label: string;
  onClick?: () => void;
}

const NavItem = ({ href, label, onClick }: NavItemProps) => {
  const [location] = useLocation();
  const isHomepage = location === "/" || location === "";
  
  // For internal navigation (section links)
  if (href.startsWith('#')) {
    // If we're not on the homepage, we need to navigate to homepage first
    if (!isHomepage) {
      return (
        <Link href={`/${href}`}>
          <div
            className="hover:text-primary transition-colors cursor-pointer" 
            onClick={onClick}
          >
            {label}
          </div>
        </Link>
      );
    }
    
    // Regular anchor link when already on homepage
    return (
      <a 
        href={href} 
        className="hover:text-primary transition-colors" 
        onClick={onClick}
      >
        {label}
      </a>
    );
  }
  
  // For page navigation
  return (
    <Link href={href}>
      <div
        className="hover:text-primary transition-colors cursor-pointer" 
        onClick={onClick}
      >
        {label}
      </div>
    </Link>
  );
};

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav 
      className={`py-4 px-6 fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#231942] shadow-lg" : "bg-[#231942]/90 backdrop-blur-md"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <VibeLogo />
              <span className="font-heading font-bold text-xl md:text-2xl text-white">
                VIBE<span className="text-primary">CODE</span> 2026
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 font-medium text-white">
          <NavItem href="#about" label="About" />
          <NavItem href="#venue" label="Venue" />
          <NavItem href="#tickets" label="Tickets" />
          <NavItem href="#merchandise" label="Merchandise" />
          <NavItem href="/sponsorship" label="Sponsorship" />
          <NavItem href="#register" label="Register" />
        </div>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          className="md:hidden text-white"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden absolute top-full left-0 right-0 bg-[#231942] shadow-lg p-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex flex-col space-y-4 text-white">
            <NavItem href="#about" label="About" onClick={closeMenu} />
            <NavItem href="#venue" label="Venue" onClick={closeMenu} />
            <NavItem href="#tickets" label="Tickets" onClick={closeMenu} />
            <NavItem href="#merchandise" label="Merchandise" onClick={closeMenu} />
            <NavItem href="/sponsorship" label="Sponsorship" onClick={closeMenu} />
            <NavItem href="#register" label="Register" onClick={closeMenu} />
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
