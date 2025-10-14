import { useState, useEffect } from 'react';
import './ScrollToTopButton.css';
import subir from '../../assets/subir.png';

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      className={`scroll-to-top ${isVisible ? 'show' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <img
        src={subir} // Asegúrate de tener este ícono en la ruta correcta
        alt="Subir"
      />
    </button>
  );
}

export default ScrollToTopButton;
