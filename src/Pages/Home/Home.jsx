import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import imagenHome from '../../assets/imagenHome.png';
import santiagoSim from '../../assets/santiagoSim.jpg';
import valentinaSim from '../../assets/valentinaSim.jpg';
import placeholderCharacter from '../../assets/noImage.png'; // 🔹 Imagen local por si falla
import './Home.css';

function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [characters, setCharacters] = useState([]);
  const springfieldRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      if (springfieldRef.current) {
        const rect = springfieldRef.current.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.8) {
          springfieldRef.current.classList.add('visible');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 🔹 Cargar personajes populares desde la API
  useEffect(() => {
    fetch('https://thesimpsonsapi.com/api/characters')
      .then(res => res.json())
      .then(data => {
        const results = Array.isArray(data)
          ? data
          : Array.isArray(data.results)
          ? data.results
          : [];
        setCharacters(results.slice(0, 8)); // Mostrar 8 personajes
      })
      .catch(err => console.error('Error cargando personajes:', err));
  }, []);

  return (
    <div className="home-container">
      <div className="clouds-background"></div>

      {/* Header */}
      <header className="simpsons-header">
        <div className="title-container">
          <img src={imagenHome} alt="The Simpsons" className="simpsons-title" />
        </div>
      </header>

      <main className={`home-main-content ${isVisible ? 'visible' : ''}`}>
        {/* Tarjetas principales */}
        <div className="clouds-section">
          <div className="clouds-container">
            <div className="cloud-card" style={{ animationDelay: '0s' }}>
              <div className="cloud-content">
                <div className="cloud-icon" style={{ color: '#FFD90F' }}>
                  <i className="bi bi-people"></i>
                </div>
                <h3>Personajes</h3>
                <p>Descubre todos los personajes de Springfield con sus detalles completos</p>
                <Link
                  to="/personajes"
                  className="cloud-btn"
                  style={{ backgroundColor: '#FFD90F', borderColor: '#FFD90F' }}
                >
                  Explorar
                </Link>
              </div>
            </div>

            <div className="cloud-card" style={{ animationDelay: '0.2s' }}>
              <div className="cloud-content">
                <div className="cloud-icon" style={{ color: '#4A90E2' }}>
                  <i className="bi bi-geo-alt"></i>
                </div>
                <h3>Lugares</h3>
                <p>Explora los lugares icónicos como la Taberna de Moe y la Escuela Primaria</p>
                <Link
                  to="/lugares"
                  className="cloud-btn"
                  style={{ backgroundColor: '#4A90E2', borderColor: '#4A90E2' }}
                >
                  Explorar
                </Link>
              </div>
            </div>

            <div className="cloud-card" style={{ animationDelay: '0.4s' }}>
              <div className="cloud-content">
                <div className="cloud-icon" style={{ color: '#FF6B6B' }}>
                  <i className="bi bi-tv"></i>
                </div>
                <h3>Episodios</h3>
                <p>Revisa todos los episodios de la serie con sus sinopsis y fechas de emisión</p>
                <Link
                  to="/episodios"
                  className="cloud-btn"
                  style={{ backgroundColor: '#FF6B6B', borderColor: '#FF6B6B' }}
                >
                  Explorar
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 🟨 Personajes Populares */}
        <section className="popular-characters">
          <h2 className="simpson-font">Personajes Populares</h2>

          <div className="characters-grid">
            {characters.length > 0 ? (
              characters.map((character) => {
                const imageUrl = character.portrait_path
                  ? `https://cdn.thesimpsonsapi.com/500${character.portrait_path}`
                  : placeholderCharacter;

                return (
                  <div key={character.id} className="character-card-simpson">
                    <img
                      src={imageUrl}
                      alt={character.name}
                      className="character-img"
                      onError={(e) => {
                        e.target.src = placeholderCharacter;
                      }}
                    />
                    <h3 className="character-name">{character.name}</h3>
                    <p className="character-occupation frase-corta">{character.occupation || 'Desconocida'}</p>

                    <div className="character-info">
                      <span className="badge age">Edad: {character.age || 'N/A'}</span>
                      <span
                        className={`badge status ${
                          character.status === 'Alive' ? 'alive' : 'dead'
                        }`}
                      >
                        {character.status || 'Desconocido'}
                      </span>
                    </div>

                    {character.phrases && character.phrases.length > 0 && (
                      <p className="character-quote frase-corta">"{character.phrases[0]}"</p>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="loading-text">Cargando personajes...</p>
            )}
          </div>
        </section>

        {/* 🧠 Creadores */}
        <section className="creators-section">
          <h2 className="simpson-font">Creadores del Proyecto</h2>
          <div className="creators-grid">
            <div className="creator-card">
              <img src={valentinaSim} alt="Creador 1" />
              <h4>Valentina Sanjuan</h4>
              <p>Diseñadora UI / UX</p>
            </div>
            <div className="creator-card">
              <img src={santiagoSim} alt="Creador 2" />
              <h4>Santiago Torres</h4>
              <p>Programador Frontend</p>
            </div>
            <div className="creator-card">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/512px-ChatGPT_logo.svg.png"
                alt="Creador 3"
              />
              <h4>ChatGPT</h4>
              <p>Backend / API</p>
            </div>
            <div className="creator-card">
              <img
                src="https://registry.npmmirror.com/@lobehub/icons-static-png/1.74.0/files/dark/deepseek-color.png"
                alt="Creador 4"
              />
              <h4>DeepSeek</h4>
              <p>Tester / Documentación</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <div ref={springfieldRef} className="springfield-footer">
        <div className="springfield-overlay">
          <h3>Bienvenido a Springfield</h3>
          <p>Explora el universo de Los Simpson</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
