import { useState } from 'react';
import { Link } from 'react-router-dom'; // ✅ Agregar esto
import './CharacterCard.css';

function CharacterCard({ character }) {
  const [imageError, setImageError] = useState(false);
  const [showAllPhrases, setShowAllPhrases] = useState(false);
  
  const imageUrl = character.portrait_path && !imageError
    ? `https://cdn.thesimpsonsapi.com/500${character.portrait_path}`
    : '/placeholder-character.jpg';

  const displayPhrases = showAllPhrases 
    ? character.phrases 
    : (character.phrases ? character.phrases.slice(0, 1) : []);

  return (
    <div className="character-card">
      <div className="character-image">
        <img 
          src={imageUrl} 
          alt={character.name}
          onError={() => setImageError(true)}
        />
      </div>
      
      <div className="character-info">
        <h3>{character.name}</h3>
        
        <div className="character-meta">
          <div className="meta-item">
            <i className="bi bi-briefcase meta-icon"></i>
            <strong>Ocupación:</strong>
            <span className="frase-corta">{character.occupation || 'Desconocida'}</span>
          </div>
          
          <div className="meta-item">
            <i className="bi bi-heart-pulse meta-icon"></i>
            <strong>Estado:</strong>
            <span className={`status-badge ${
              character.status?.toLowerCase() === 'alive' ? 'status-alive' : 'status-dead'
            }`}>
              <i className={`bi ${
                character.status?.toLowerCase() === 'alive' ? 'bi-heart-fill' : 'bi-heartbreak-fill'
              }`}></i>
              {character.status || 'Desconocido'}
            </span>
          </div>
        </div>

        {character.phrases && character.phrases.length > 0 && (
          <div className="character-phrases">
            <div className="phrases-title">
              <i className="bi bi-chat-quote"></i> Frase Célebre
            </div>
            {displayPhrases.map((phrase, index) => (
              <p key={index} className="character-quote">"{phrase}"</p>
            ))}
            {character.phrases.length > 1 && (
              <button 
                className="read-more-btn"
                onClick={() => setShowAllPhrases(!showAllPhrases)}
              >
                {showAllPhrases ? 'Ver menos' : `Ver ${character.phrases.length - 1} más`}
                <i className={`bi ${showAllPhrases ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
              </button>
            )}
          </div>
        )}

        <Link to={`/personaje/${character.id}`} className="detail-btn">
          <i className="bi bi-eye"></i>
          Ver Detalles
        </Link>
      </div>
    </div>
  );
}

export default CharacterCard;
