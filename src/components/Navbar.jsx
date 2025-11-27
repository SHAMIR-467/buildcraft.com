import React, { useState, useEffect } from "react";
import { Menu, X, Hammer } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom"; // <-- Move import to top

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/", isRoute: true },
    { name: "Services", href: "/#services", isRoute: false },
    { name: "Tracker", href: "/tracker", isRoute: true },
    { name: "Projects", href: "/#projects", isRoute: false },
    { name: "Floor Plan AI", href: "/floorplan", isRoute: true },
    { name: "Testimonials", href: "/testimonials", isRoute: true },
    { name: "Contact", href: "/#contact", isRoute: false },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-500 ${scrolled
        ? "bg-orange-50/60 backdrop-blur-lg shadow-lg py-4"
        : "bg-orange-50/10 py-4 md:py-6"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center group cursor-pointer">
            <div
              className={`p-2 rounded-lg transition-colors ${scrolled
                ? "bg-orange-200 text-orange-800"
                : "bg-orange-50/10 text-orange-800 backdrop-blur-sm"
                }`}
            >
              <Hammer className="h-6 w-6" />
            </div>
            <span
              className={`ml-3 text-2xl font-bold tracking-tight ${scrolled ? "text-orange-800" : "text-orange-900"
                }`}
            >
              Build<span className="text-secondary">Craft</span>
            </span>
          </div>

          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) =>
              link.isRoute ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`font-medium text-sm uppercase tracking-wider transition-all hover:-translate-y-0.5 ${scrolled
                    ? "text-orange-800 hover:text-orange-900"
                    : "text-orange-900/80 hover:text-orange-900"
                    }`}
                >
                  {link.name}
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-secondary"></span>
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className={`font-medium text-sm uppercase tracking-wider transition-all hover:-translate-y-0.5 ${scrolled
                    ? "text-orange-800 hover:text-orange-900"
                    : "text-orange-900/80 hover:text-orange-900"
                    }`}
                >
                  {link.name}
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-secondary"></span>
                </a>
              )
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md transition-colors ${scrolled
                ? "text-orange-800 hover:bg-orange-100"
                : "text-orange-900 hover:bg-orange-50/20"
                }`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-orange-50/95 backdrop-blur-xl shadow-xl overflow-hidden border-t border-orange-200"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navLinks.map((link) =>
                link.isRoute ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="block px-4 py-3 rounded-xl text-base font-medium text-orange-800 hover:text-orange-900 hover:bg-orange-50 transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block px-4 py-3 rounded-xl text-base font-medium text-orange-800 hover:text-orange-900 hover:bg-orange-50 transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
