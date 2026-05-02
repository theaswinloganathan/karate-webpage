import React from 'react';

const Footer = () => {
  return (
    <footer className="footer bg-black">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <a href="#home" className="logo" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>
              <span className="text-red">ELITE</span> KARATE
            </a>
            <p className="footer-text">
              Empowering individuals through traditional martial arts, discipline, and modern self-defense techniques.
            </p>
            <div className="social-links">
              <a href="#" className="social-icon">Fb</a>
              <a href="#" className="social-icon">Ig</a>
              <a href="#" className="social-icon">Yt</a>
              <a href="#" className="social-icon">Tw</a>
            </div>
          </div>
          
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#courses">Programs</a></li>
              <li><a href="#gallery">Gallery</a></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>Support</h4>
            <ul className="footer-links">
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>Newsletter</h4>
            <p className="footer-text">Subscribe to get updates on new batches and events.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Your Email" required />
              <button type="submit" className="btn btn-primary" style={{ padding: '0.8rem' }}>Subscribe</button>
            </form>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Elite Karate Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
