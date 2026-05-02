import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Courses', href: '#courses' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Timings', href: '#timings' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div style={{ background: 'var(--color-red)', color: 'white', textAlign: 'center', padding: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>
        LATEST UPDATE: Demo Access Enabled! Click Login to try.
      </div>
      <div className="container nav-container">
        <Link to="/#home" className="logo">
          <span className="text-red">ELITE</span> KARATE
        </Link>

        {/* Desktop Nav */}
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a href={`/${link.href}`}>{link.name}</a>
            </li>
          ))}
          <li>
            <Link to="/login" className="btn btn-outline btn-sm" style={{ marginRight: '10px' }}>Login</Link>
          </li>
          <li>
            <Link to="/#contact" className="btn btn-primary btn-sm">Join Now</Link>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button 
          className="mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <ul>
          {navLinks.map((link) => (
            <li key={link.name}>
              <a 
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            </li>
          ))}
          <li style={{ marginTop: '1rem' }}>
            <Link to="/login" className="btn btn-outline btn-sm w-100" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
          </li>
          <li>
            <Link to="/#contact" className="btn btn-primary btn-sm w-100" onClick={() => setIsMobileMenuOpen(false)}>Join Now</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
