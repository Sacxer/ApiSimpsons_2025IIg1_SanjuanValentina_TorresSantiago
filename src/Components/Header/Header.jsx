import React from 'react';
import './Header.css';
import TituloSimpson from '../../assets/TituloSimpson.webp'; // si no existe, usa una imagen propia

const Header = () => {
  return (
    <header className="header">
      <div className="header-inner container">
        <div className="header-left">
          <img src={TituloSimpson} alt="Los Simpson" className="header-logo" />
        </div>
        <div className="header-right">
          <h1 className="header-title simpson-font">The Simpsons API</h1>
          <p className="header-subtitle">Explora Springfield y sus personajes</p>
        </div>
      </div>
    </header>
  )
}

export default Header;
