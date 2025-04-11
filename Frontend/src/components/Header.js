import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';
import logoImage from '../assets/images/logo/figs blue logo.png';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdowns, setActiveDropdowns] = useState({});
  const dropdownRefs = useRef({});

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    const handleClickOutside = (event) => {
      Object.keys(dropdownRefs.current).forEach(key => {
        if (dropdownRefs.current[key] && !dropdownRefs.current[key].contains(event.target)) {
          setActiveDropdowns(prev => ({
            ...prev,
            [key]: false
          }));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = (id, event) => {
    event.preventDefault();
    event.stopPropagation();
    setActiveDropdowns(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Logo Section */}
        <div className="header-logo">
          <Link to="/">
            <img 
              src={logoImage} 
              alt="FIGS Logo" 
              className="logo"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/150x50?text=FIGS';
              }}
            />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={`mobile-menu-toggle ${menuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Links */}
        <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
          <ul className="nav-links">
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link" onClick={() => setMenuOpen(false)}>About</Link>
            </li>
            <li 
              className={`nav-item dropdown ${activeDropdowns['services'] ? 'active' : ''}`}
              ref={el => dropdownRefs.current['services'] = el}
            >
              <button 
                className="nav-link dropdown-toggle"
                onClick={(e) => toggleDropdown('services', e)}
              >
                Services
              </button>
              <ul className={`dropdown-menu ${activeDropdowns['services'] ? 'show' : ''}`}>
                <li><a href="https://searchmycolleges.com/" target="_blank" rel="noopener noreferrer">Search My Colleges</a></li>
                <li><a href="https://searchmytrips.com/" target="_blank" rel="noopener noreferrer">Search My Trips</a></li>
                <li><a href="https://searchmymedical.com/" target="_blank" rel="noopener noreferrer">Search My Medical</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="/next" className="nav-link" onClick={() => setMenuOpen(false)}>NExT</Link>
            </li>
            <li 
              className={`nav-item dropdown ${activeDropdowns['quizzes'] ? 'active' : ''}`}
              ref={el => dropdownRefs.current['quizzes'] = el}
            >
              <button 
                className="nav-link dropdown-toggle"
                onClick={(e) => toggleDropdown('quizzes', e)}
              >
                Quizzes
              </button>
              <ul className={`dropdown-menu ${activeDropdowns['quizzes'] ? 'show' : ''}`}>
                <li><Link to="/mock-tests" onClick={() => setMenuOpen(false)}>Mock Tests</Link></li>
                <li><Link to="/courses" onClick={() => setMenuOpen(false)}>Courses</Link></li>
                <li><Link to="/study-materials" onClick={() => setMenuOpen(false)}>Study Materials</Link></li>
              </ul>
            </li>
            <li 
              className={`nav-item dropdown ${activeDropdowns['blogs'] ? 'active' : ''}`}
              ref={el => dropdownRefs.current['blogs'] = el}
            >
              <button 
                className="nav-link dropdown-toggle"
                onClick={(e) => toggleDropdown('blogs', e)}
              >
                Blogs & Articles
              </button>
              <ul className={`dropdown-menu ${activeDropdowns['blogs'] ? 'show' : ''}`}>
                <li><Link to="/blogs/medical" onClick={() => setMenuOpen(false)}>Medical Updates</Link></li>
                <li><Link to="/blogs/exam-prep" onClick={() => setMenuOpen(false)}>Exam Preparation</Link></li>
                <li><Link to="/blogs/career" onClick={() => setMenuOpen(false)}>Career Guidance</Link></li>
                <li><Link to="/blogs/all" onClick={() => setMenuOpen(false)}>All Articles</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link" onClick={() => setMenuOpen(false)}>Contact</Link>
            </li>
          </ul>
        </nav>

        {/* Auth Buttons */}
        <div className="auth-buttons">
          <Link to="/login" className="auth-btn login-btn">Login</Link>
          <Link to="/register" className="auth-btn signup-btn">Sign Up</Link>
        </div>
      </div>
    </header>
  );
};

export default Header; 