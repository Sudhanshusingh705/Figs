import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="header">
      <div className="header__top">
        <div className="header__container">
          <Link to="/" className="header__logo">
            <img src="/logo.png" alt="Logo" />
          </Link>
          
          <nav className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`}>
            <ul className="header__menu">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/next">NExT</Link></li>
              <li><Link to="/quizzes">Quizzes</Link></li>
              <li><Link to="/articles">Articles</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>

          <div className="header__auth">
            {user ? (
              <div className="header__user">
                <span>Welcome, {user.name}</span>
                <Link to={user.role === 'admin' ? '/admin' : '/dashboard'}>
                  Dashboard
                </Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              <div className="header__buttons">
                <Link to="/login" className="btn btn--login">Login</Link>
                <Link to="/register" className="btn btn--register">Register</Link>
              </div>
            )}
          </div>

          <button 
            className="header__menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 