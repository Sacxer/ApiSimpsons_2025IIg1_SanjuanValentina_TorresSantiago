import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './Navbar.css';
import resortera from '../../assets/resortera.png';

function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navItems = [
    { path: '/', icon: 'bi-house-door', label: 'Inicio' },
    { path: '/personajes', icon: 'bi-people', label: 'Personajes' },
    { path: '/lugares', icon: 'bi-geo-alt', label: 'Lugares' },
    { path: '/episodios', icon: 'bi-tv', label: 'Episodios' }
  ];

  return (
    <nav className={`navbar ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <div className="logo-icon">
            <img src={resortera} alt="resortera" />
          </div>
          <span className="logo-text">Simpsons Universe</span>
        </Link>

        {/* Menú de Navegación - Desktop */}
        <ul className="nav-menu">
          {navItems.map((item) => (
            <li key={item.path} className="nav-item">
              <Link 
                to={item.path} 
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                <i className={`${item.icon} nav-icon`}></i>
                <span className="nav-text">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Menú Hamburguesa - Mobile */}
        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Menú Mobile */}
        <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
          <div className="mobile-menu-backdrop" onClick={closeMenu}></div>
          <div className="mobile-menu-content">
            <div className="mobile-menu-header">
              <Link to="/" className="mobile-logo" onClick={closeMenu}>
                <img src={resortera} alt="resortera" />
                <span>Simpsons Universe</span>
              </Link>
              <button className="mobile-close" onClick={closeMenu}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            
            <ul className="mobile-nav-items">
              {navItems.map((item) => (
                <li key={item.path} className="mobile-nav-item">
                  <Link 
                    to={item.path} 
                    className={`mobile-nav-link ${location.pathname === item.path ? 'active' : ''}`}
                    onClick={closeMenu}
                  >
                    <i className={item.icon}></i>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mobile-menu-footer">
              <p>Explora el mundo de Los Simpson</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;