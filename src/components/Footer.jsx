import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import insta from "../pics/insta.png";
import linkedin from "../pics/linkedin.png";
import facebook from "../pics/facebook.jpg";
import logo from "../pics/logo.jpg";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content container">
        {/* 1. Brand & About Column */}
        <div className="footer-brand-col">
          <Link to="/" className="footer-logo" aria-label="National Solar System">
            <img src={logo} alt="National Solar System" />
          </Link>
          <p className="footer-tagline">
            Empowering homes, commercial facilities, and industries with clean, reliable, and sustainable solar energy across India.
          </p>
          <div className="footer-badges">
            <span className="footer-badge">☀️ MNRE Approved</span>
            <span className="footer-badge">⚡ Subsidies Available</span>
          </div>
        </div>

        {/* 2. Quick Links Section */}
        <div className="footer-section links-section">
          <h3 className="footer-title quick-links-title">Quick Links</h3>
          <div className="quick-links-grid">
            <div className="link-column">
              <Link to="/">Home</Link>
              <Link to="/projects">Projects</Link>
            </div>
            <div className="link-column">
              <Link to="/calculator">Solar Calculator</Link>
              <Link to="/scheme">Government Scheme</Link>
            </div>
            <div className="link-column">
              <Link to="/services">Product & Services</Link>
              <Link to="/about">About Us</Link>
            </div>
          </div>
        </div>

        {/* 3. Contact & Social Media Section */}
        <div className="footer-section contact-section">
          <h3 className="footer-title contact-title">Contact Us</h3>
          <p className="footer-contact-info">
            📍 Nigdi, Pune, Maharashtra<br />
            📞 +91 91194 77479 / +91 89566 67915<br />
            ✉️ nationalsolars5@gmail.com
          </p>

          <div className="social-icons">
            <a
              href="https://www.instagram.com/national_solars5?igsh=MTYyMXprcTRtemxrNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="Follow us on Instagram"
            >
              <img src={insta} alt="Instagram" className="icon-image" />
            </a>

            <a
              href="https://www.linkedin.com/in/national-solar-system-85448b3a6"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="Connect with us on LinkedIn"
            >
              <img src={linkedin} alt="LinkedIn" className="icon-image" />
            </a>

            <a
              href="https://www.facebook.com/share/18EgftFDu1/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="Follow us on Facebook"
            >
              <img src={facebook} alt="Facebook" className="icon-image" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© {new Date().getFullYear()} National Solar System. All rights reserved.</p>
          <p className="footer-bottom-tagline">Powering the future with solar • Clean • Reliable • Sustainable</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
