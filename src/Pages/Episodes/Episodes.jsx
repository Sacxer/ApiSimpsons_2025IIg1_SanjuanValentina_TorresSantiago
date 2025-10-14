import { useState, useEffect } from 'react';
import Pagination from '../../Components/Pagination/Pagination';
import Loader from '../../Components/Loader/Loader';
import './Episodes.css';
import staticImage from '../../assets/img4.png';

function Episodes() {
  const [allEpisodes, setAllEpisodes] = useState([]);
  const [filteredEpisodes, setFilteredEpisodes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Cargar todos los episodios
  useEffect(() => {
    fetchAllEpisodes();
  }, []);

  // Filtrar en tiempo real
  useEffect(() => {
    let filtered = allEpisodes;

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(episode => 
        episode.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por temporada
    if (selectedSeason) {
      filtered = filtered.filter(episode => episode.season === parseInt(selectedSeason));
    }

    setFilteredEpisodes(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedSeason, allEpisodes]);

  const fetchAllEpisodes = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Cargar todas las páginas
      const allEpisodesData = [];
      let page = 1;
      let hasMore = true;

      while (hasMore && page <= 50) { // Límite por seguridad
        const response = await fetch(`https://thesimpsonsapi.com/api/episodes?page=${page}`);
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
          allEpisodesData.push(...data.results);
          page++;
        } else {
          hasMore = false;
        }
      }

      setAllEpisodes(allEpisodesData);
      setFilteredEpisodes(allEpisodesData);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // Obtener todas las temporadas únicas
  const seasons = [...new Set(allEpisodes.map(episode => episode.season))]
    .sort((a, b) => a - b);

  // Paginación
  const episodesPerPage = 10;
  const startIndex = (currentPage - 1) * episodesPerPage;
  const paginatedEpisodes = filteredEpisodes.slice(startIndex, startIndex + episodesPerPage);
  const totalPages = Math.ceil(filteredEpisodes.length / episodesPerPage);

  if (loading) return <Loader />;
  
  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={fetchAllEpisodes}>Reintentar</button>
      </div>
    );
  }

  return (
    <div className="episodes-page">
      <div className="clouds-background"></div>
      {/* Imagen estática fija */}
      <div className="episodes-static-image">
        <img 
          src={staticImage}
          alt="The Simpsons" 
        />
      </div>

      <h2>Episodios de Los Simpson</h2>
      
      {/* Barra de búsqueda y filtros */}
      <div className="search-filter-bar">
        <div className="search-container">
          <i className="bi bi-search"></i>
          <input
            type="text"
            placeholder="Buscar episodio por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-container">
          <select 
            value={selectedSeason} 
            onChange={(e) => setSelectedSeason(e.target.value)}
            className="season-select"
          >
            <option value="">Todas las temporadas</option>
            {seasons.map(season => (
              <option key={season} value={season}>
                Temporada {season}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Contador de resultados */}
      <div className="results-info">
        <span className='negro'>{filteredEpisodes.length} episodios encontrados</span>
        {(searchTerm || selectedSeason) && (
          <button 
            className="clear-btn"
            onClick={() => {
              setSearchTerm('');
              setSelectedSeason('');
            }}
          >
            Limpiar filtros
          </button>
        )}
      </div>
      
      {/* Lista de episodios */}
      <div className="episodes-list">
        {paginatedEpisodes.length > 0 ? (
          paginatedEpisodes.map(episode => (
            <EpisodeCard key={episode.id} episode={episode} />
          ))
        ) : (
          <div className="no-results">
            <i className="bi bi-tv"></i>
            <h3>No se encontraron episodios</h3>
            <p>Intenta con otros términos de búsqueda</p>
          </div>
        )}
      </div>

      {/* Paginación */}
      {filteredEpisodes.length > episodesPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

// Componente de tarjeta de episodio
function EpisodeCard({ episode }) {
  const defaultImage = "https://i.pinimg.com/736x/81/60/d1/8160d14853f96fd62dc99b16d20c3ac7.jpg";
  
  const imageUrl = episode.image_path 
    ? `https://cdn.thesimpsonsapi.com/200${episode.image_path}`
    : defaultImage;

  return (
    <div className="episode-card">
      <div className="episode-image">
        <img 
          src={imageUrl} 
          alt={episode.name}
          onError={(e) => {
            e.target.src = defaultImage;
          }}
        />
      </div>
      
      <div className="episode-info">
        <h3>{episode.name}</h3>
        
        <div className="episode-details">
          <span className="season-episode">
            T{episode.season} • E{episode.episode_number}
          </span>
          <span className="air-date">
            {new Date(episode.airdate).toLocaleDateString('es-ES')}
          </span>
        </div>

        {episode.synopsis && (
          <p className="synopsis">{episode.synopsis}</p>
        )}
      </div>
    </div>
  );
}

export default Episodes;