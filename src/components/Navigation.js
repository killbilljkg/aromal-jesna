import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Navigation.css';

const Navigation = ({ couple }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Meet the Couple', href: '/our-story' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Schedule', href: '/schedule' },
    { name: 'RSVP', href: '/rsvp' }
  ];

  // Preserve query parameters when navigating
  const getFullPath = (href) => {
    return `${href}${location.search}`;
  };

  return (
    <motion.nav
      className={`navigation ${scrolled || !isHomePage ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="nav-container">
        <Link to={`/${location.search}`} className="nav-logo">
          <div className="nav-monogram">
            {couple?.groom.name.charAt(0)} & {couple?.bride.name.charAt(0)}
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-links">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              to={getFullPath(link.href)}
              className="nav-link"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-links">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={getFullPath(link.href)}
              className="mobile-nav-link"
              onClick={closeMobileMenu}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
