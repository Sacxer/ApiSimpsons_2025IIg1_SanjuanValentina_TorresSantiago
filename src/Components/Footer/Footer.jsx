import React from 'react';
import './Footer.css';
import santiagoSim from '../../assets/santiagoSim.png';
import valentinaSim from '../../assets/valentinaSim.png';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner container">
        <div className="footer-brand">
          <div className="logo-circle" aria-hidden>
            <span>🍩</span>
          </div>
          <div>
            <h3 className="footer-title">Simpsons Universe</h3>
            <p className="footer-sub">Fan site - Personajes, locaciones y episodios</p>
          </div>
        </div>
          
        <div className="footer-meta">
          <p>Hecho con amor Valentina && Santiago</p>
          <p className="muted">© {year} Simpsons Hub. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
