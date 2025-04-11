import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';
import logoImage from '../assets/images/logo/figs white logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-row">
          <div className="footer-column" style={{ flex: '1.5' }}>
            <div className="footer-logo">
              <img 
                src={logoImage} 
                alt="FIGS Logo" 
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/150x50?text=FIGS';
                }}
              />
            </div>
            <p className="footer-about">
              Future Indo Global Service (FIGS) is a premier medical education platform dedicated to empowering medical students in their journey towards excellence. We specialize in comprehensive NEXT preparation, offering cutting-edge learning resources, expert guidance, and innovative teaching methodologies to shape the future of healthcare professionals.
            </p>
            <div className="footer-social">
              <a href="https://www.facebook.com/profile.php?id=61574846008543" target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://x.com/fig_services" target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://www.instagram.com/futureindoglobalservice/" target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.youtube.com/@FutureIndoGlobalServices" target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/quizzes">Quizzes</Link></li>
              <li><Link to="/mock-tests">Mock Tests</Link></li>
              <li><Link to="/courses">Courses</Link></li>
              <li><Link to="/study-materials">Study Materials</Link></li>
              <li><Link to="/blogs">Blogs</Link></li>
              <li><Link to="/articles">Articles</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">Resources</h3>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/book-counseling">Book Counseling</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">Contact Us</h3>
            <div className="footer-contact">
              <div className="contact-item">
                <i className="fas fa-map-marker-alt contact-icon"></i>
                <span>Figs, 519, B Tower, Ithum Tower, Noida Sector 62, Uttar Pradesh 201309</span>
              </div>
              <div className="contact-item contact-numbers">
                <i className="fas fa-phone-alt contact-icon"></i>
                <div className="phone-numbers">
                  <span>+91 8882855844 | </span>
                  <span>+91 120-4438-111</span>
                </div>
              </div>
              <div className="contact-item">
                <i className="fas fa-envelope contact-icon"></i>
                <span>info@futureindoglobalservices.com</span>
              </div>
            </div>
            <div className="newsletter-section">
              <h3 className="footer-title">Newsletter</h3>
              <p className="footer-about">
                Subscribe to our newsletter for the latest updates and resources.
              </p>
              <form className="newsletter-form">
                <input
                  type="email"
                  placeholder="Your email"
                  className="newsletter-input"
                  required
                />
                <button
                  type="submit"
                  className="newsletter-button"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {currentYear} FIGS (Future Indo Global Service). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 