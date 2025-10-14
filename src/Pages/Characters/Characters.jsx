import { useState, useEffect } from 'react';
import CharacterCard from '../../Components/CharacterCard/CharacterCard';
import Pagination from '../../Components/Pagination/Pagination';
import Loader from '../../Components/Loader/Loader';
import './Characters.css';

function Characters() {
  const [allCharacters, setAllCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const CHARACTERS_PER_PAGE = 10;

  // ✅ 1. Cargar cantidad total de personajes una sola vez
  useEffect(() => {
    const fetchAllCharacters = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('https://thesimpsonsapi.com/api/characters?page=1');
        const data = await response.json();

        if (!response.ok) {
          throw new Error('Error al cargar los personajes');
        }

        const totalCharacters = data.count;
        const calculatedTotalPages = Math.ceil(totalCharacters / CHARACTERS_PER_PAGE);
        setTotalPages(calculatedTotalPages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCharacters();
  }, []);

  // ✅ 2. Cargar personajes según la página actual
  useEffect(() => {
    const fetchCharactersForPage = async (page) => {
      try {
        setLoading(true);
        setError(null);

        // La API devuelve 20 personajes por página, ajustamos a 10
        const apiPage = Math.ceil((page * CHARACTERS_PER_PAGE) / 20);
        const response = await fetch(`https://thesimpsonsapi.com/api/characters?page=${apiPage}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error('Error al cargar los personajes');
        }

        const startIndex = ((page - 1) * CHARACTERS_PER_PAGE) % 20;
        const charactersToShow = data.results.slice(startIndex, startIndex + CHARACTERS_PER_PAGE);

        setAllCharacters(charactersToShow);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharactersForPage(currentPage);
  }, [currentPage]);

  // ✅ 3. Cambiar de página
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  };

  // ✅ 4. Mostrar estados de carga y error
  if (loading && allCharacters.length === 0) return <Loader />;

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => setCurrentPage(1)}>Reintentar</button>
      </div>
    );
  }

  // ✅ 5. Render principal
  return (
    <div className="characters-page">
      <h2>Personajes de Los Simpson</h2>
      <p className="page-info2">
        Página {currentPage} de {totalPages} - Mostrando {allCharacters.length} personajes
      </p>

      <div className="characters-grid">
        {allCharacters.map(character => (
          <CharacterCard key={character.id} character={character} />
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

export default Characters;

