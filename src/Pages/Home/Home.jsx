import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import imagenHome from '../../assets/imagenHome.png';
import './Home.css';

function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const springfieldRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      if (springfieldRef.current) {
        const rect = springfieldRef.current.getBoundingClientRect();
        const isInViewport = rect.top <= window.innerHeight * 0.8;
        
        if (isInViewport) {
          springfieldRef.current.classList.add('visible');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home-container">
      {/* Fondo de nubes fijo */}
      <div className="clouds-background"></div>
      
      {/* Header con título The Simpsons */}
      <header className="simpsons-header">
        <div className="title-container">
          <img 
            src={imagenHome} 
            alt="The Simpsons" 
            className="simpsons-title"
          />
        </div>
      </header>

      {/* Sección principal con tarjetas-nube */}
      <main className={`home-main-content ${isVisible ? 'visible' : ''}`}>
        <div className="clouds-section">
          <div className="clouds-container">
            
            {/* Tarjeta Personajes */}
            <div className="cloud-card" style={{ animationDelay: '0s' }}>
              <div className="cloud-content">
                <div className="cloud-icon" style={{ color: '#FFD90F' }}>
                  <i className="bi bi-people"></i>
                </div>
                <h3>Personajes</h3>
                <p>Descubre todos los personajes de Springfield con sus detalles completos</p>
                <Link to="/personajes" className="cloud-btn" style={{ backgroundColor: '#FFD90F', borderColor: '#FFD90F' }}>
                  Explorar
                </Link>
              </div>
            </div>

            {/* Tarjeta Lugares */}
            <div className="cloud-card" style={{ animationDelay: '0.2s' }}>
              <div className="cloud-content">
                <div className="cloud-icon" style={{ color: '#4A90E2' }}>
                  <i className="bi bi-geo-alt"></i>
                </div>
                <h3>Lugares</h3>
                <p>Explora los lugares icónicos como la Taberna de Moe y la Escuela Primaria</p>
                <Link to="/lugares" className="cloud-btn" style={{ backgroundColor: '#4A90E2', borderColor: '#4A90E2' }}>
                  Explorar
                </Link>
              </div>
            </div>

            {/* Tarjeta Episodios */}
            <div className="cloud-card" style={{ animationDelay: '0.4s' }}>
              <div className="cloud-content">
                <div className="cloud-icon" style={{ color: '#FF6B6B' }}>
                  <i className="bi bi-tv"></i>
                </div>
                <h3>Episodios</h3>
                <p>Revisa todos los episodios de la serie con sus sinopsis y fechas de emisión</p>
                <Link to="/episodios" className="cloud-btn" style={{ backgroundColor: '#FF6B6B', borderColor: '#FF6B6B' }}>
                  Explorar
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* 🧠 Sección de Creadores */}
        <section className="creators-section">
          <h2 className="simpson-font">Creadores del Proyecto</h2>
          <div className="creators-grid">
            <div className="creator-card">
              <img src="https://cdn-icons-png.flaticon.com/512/147/147144.png" alt="Creador 1" />
              <h4>Nombre 1</h4>
              <p>Diseñador UI / UX</p>
            </div>
            <div className="creator-card">
              <img src="https://cdn-icons-png.flaticon.com/512/147/147142.png" alt="Creador 2" />
              <h4>Nombre 2</h4>
              <p>Programador Frontend</p>
            </div>
            <div className="creator-card">
              <img src="https://cdn-icons-png.flaticon.com/512/147/147133.png" alt="Creador 3" />
              <h4>Nombre 3</h4>
              <p>Backend / API</p>
            </div>
            <div className="creator-card">
              <img src="https://cdn-icons-png.flaticon.com/512/147/147137.png" alt="Creador 4" />
              <h4>Nombre 4</h4>
              <p>Tester / Documentación</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer con Springfield */}
      <div 
        ref={springfieldRef}
        className="springfield-footer"
      >
        <div className="springfield-overlay">
          <h3>Bienvenido a Springfield</h3>
          <p>Explora el universo de Los Simpson</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
