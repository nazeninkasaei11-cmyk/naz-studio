import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/studio", label: "Studio" },
  { href: "/services", label: "Services" },
  { href: "/press", label: "Press" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/90 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="z-50 group">
          <div className="flex flex-col items-center md:items-start cursor-pointer">
            <span className={cn(
              "font-serif tracking-widest text-lg font-bold transition-colors",
              scrolled ? "text-primary" : "text-primary"
            )}>
              NAZ STUDIO
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-12">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={cn(
              "text-sm uppercase tracking-widest hover:text-primary/70 transition-colors relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[1px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full",
              location === link.href ? "text-primary after:w-full" : "text-muted-foreground"
            )}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden z-50 text-primary focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-0 left-0 w-full h-screen bg-background flex flex-col items-center justify-center space-y-8 md:hidden"
            >
              {links.map((link) => (
                <Link key={link.href} href={link.href} className={cn(
                  "text-2xl font-serif text-primary hover:text-primary/70 transition-colors",
                  location === link.href && "italic"
                )}>
                  {link.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
