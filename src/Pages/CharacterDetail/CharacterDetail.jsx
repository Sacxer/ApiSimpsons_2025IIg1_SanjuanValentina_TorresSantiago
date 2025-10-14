import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loader from '../../Components/Loader/Loader';
import './CharacterDetail.css';

function CharacterDetail() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    fetchCharacter();
  }, [id]);

  const fetchCharacter = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`https://thesimpsonsapi.com/api/characters/${id}`);
      
      if (!response.ok) {
        throw new Error('Personaje no encontrado');
      }
      
      const data = await response.json();
      setCharacter(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // URL corregida para la imagen del personaje
  const imageUrl = character?.portrait_path && !imageError
    ? `https://cdn.thesimpsonsapi.com/500${character.portrait_path}`
    : '/placeholder-character.jpg';

  if (loading) return <Loader />;
  
  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <Link to="/personajes" className="back-btn">Volver a Personajes</Link>
      </div>
    );
  }

  if (!character) return null;

  return (
    <div className="character-detail">
      <Link to="/personajes" className="back-btn">← Volver a Personajes</Link>
      
      <div className="character-detail-content">
        <div className="character-image">
          <img 
            src={imageUrl} 
            alt={character.name}
            onError={() => setImageError(true)}
          />
        </div>
        
        <div className="character-info">
          <h1>{character.name}</h1>
          
          <div className="info-grid">
            <div className="info-item">
              <strong>Edad:</strong>
              <span>{character.age || 'Desconocida'}</span>
            </div>
            
            <div className="info-item">
              <strong>Género:</strong>
              <span>{character.gender || 'Desconocido'}</span>
            </div>
            
            <div className="info-item">
              <strong>Ocupación:</strong>
              <span>{character.occupation || 'Desconocida'}</span>
            </div>
            
            <div className="info-item">
              <strong>Estado:</strong>
              <span>{character.status || 'Desconocido'}</span>
            </div>
            
            {character.birthdate && (
              <div className="info-item">
                <strong>Fecha de Nacimiento:</strong>
                <span>{character.birthdate}</span>
              </div>
            )}
          </div>

          {character.description && (
            <div className="description">
              <h3>Descripción</h3>
              <p>{character.description}</p>
            </div>
          )}

          {character.phrases && character.phrases.length > 0 && (
            <div className="phrases">
              <h3>Frases Célebres</h3>
              <ul>
                {character.phrases.map((phrase, index) => (
                  <li key={index}>"{phrase}"</li>
                ))}
              </ul>
            </div>
          )}

          {character.first_appearance_ep && (
            <div className="first-appearance">
              <h3>Primera Aparición</h3>
              <p><strong>Episodio:</strong> {character.first_appearance_ep.name}</p>
              <p><strong>Temporada {character.first_appearance_ep.season}, Episodio {character.first_appearance_ep.episode_number}</strong></p>
              <p><strong>Fecha:</strong> {character.first_appearance_ep.airdate}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CharacterDetail;