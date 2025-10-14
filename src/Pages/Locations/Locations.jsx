import { useState, useEffect } from 'react';
import Pagination from '../../Components/Pagination/Pagination';
import Loader from '../../Components/Loader/Loader';
import './Locations.css';

function Locations() {
  const [locations, setLocations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLocations(currentPage);
  }, [currentPage]);

  const fetchLocations = async (page) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`https://thesimpsonsapi.com/api/locations?page=${page}`);
      
      if (!response.ok) {
        throw new Error('Error al cargar los lugares');
      }
      
      const data = await response.json();
      setLocations(data.results);
      setTotalPages(data.pages);
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

  if (loading) return <Loader />;
  
  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => fetchLocations(currentPage)}>Reintentar</button>
      </div>
    );
  }

  return (
    <div className="locations-page">
      <div className="clouds-background"></div>
      <h1>Lugares de Los Simpson</h1>
      <p className="page-info2">Página {currentPage} de {totalPages} - {locations.length} lugares</p>
      
      <div className="locations-grid">
        {locations.map(location => (
          <LocationCard key={location.id} location={location} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

// Componente separado para la tarjeta de lugar
function LocationCard({ location }) {
  const [imageError, setImageError] = useState(false);
  
  // URL corregida para imágenes de lugares
  const imageUrl = location.image_path && !imageError
    ? `https://cdn.thesimpsonsapi.com/500${location.image_path}`
    : '/placeholder-location.jpg';

  return (
    <div className="location-card">
      <div className="location-image">
        <img 
          src={imageUrl} 
          alt={location.name}
          onError={() => setImageError(true)}
        />
      </div>
      <div className="location-info">
        <h3>{location.name}</h3>
        <p><strong>Ciudad:</strong> {location.town || 'Springfield'}</p>
        <p><strong>Tipo:</strong> {location.use || 'No especificado'}</p>
      </div>
    </div>
  );
}

export default Locations;