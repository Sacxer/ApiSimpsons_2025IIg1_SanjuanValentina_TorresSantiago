import { useState, useEffect } from 'react';
import CharacterCard from '../../Components/CharacterCard/CharacterCard';
import Pagination from '../../Components/Pagination/Pagination';
import Loader from '../../Components/Loader/Loader';
import './Characters.css';

function Characters() {
  const [allCharacters, setAllCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const CHARACTERS_PER_PAGE = 10;

  // 🟡 Cargar todos los personajes una vez
  useEffect(() => {
    const fetchAllCharacters = async () => {
      try {
        setLoading(true);
        const all = [];
        let page = 1;
        let hasMore = true;

        while (hasMore) {
          const res = await fetch(`https://thesimpsonsapi.com/api/characters?page=${page}`);
          const data = await res.json();
          all.push(...data.results);

          if (!data.next) hasMore = false;
          else page++;
        }

        setAllCharacters(all);
        setFilteredCharacters(all);
      } catch (err) {
        setError('Error al cargar los personajes');
      } finally {
        setLoading(false);
      }
    };

    fetchAllCharacters();
  }, []);

  // 🧠 Buscar por nombre parcial o por ID exacto
  const handleSearch = async (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value.trim() === '') {
      setFilteredCharacters(allCharacters);
      setCurrentPage(1);
      return;
    }

    // 🔹 Si es número → buscar por ID exacto (API)
    if (/^\d+$/.test(value)) {
      try {
        setSearching(true);
        const res = await fetch(`https://thesimpsonsapi.com/api/characters/${value}`);
        if (res.ok) {
          const data = await res.json();
          setFilteredCharacters([data]);
        } else {
          setFilteredCharacters([]);
        }
      } catch {
        setFilteredCharacters([]);
      } finally {
        setSearching(false);
      }
      return;
    }

    // 🔹 Si no es número → búsqueda parcial por nombre localmente
    const filtered = allCharacters.filter((ch) =>
      ch.name.toLowerCase().includes(value)
    );

    setFilteredCharacters(filtered);
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * CHARACTERS_PER_PAGE;
  const visibleCharacters = filteredCharacters.slice(startIndex, startIndex + CHARACTERS_PER_PAGE);
  const totalPages = Math.ceil(filteredCharacters.length / CHARACTERS_PER_PAGE);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  };

  if (loading || searching) return <Loader />;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="characters-page">
      <div className="clouds-background"></div>
      <h2>Personajes de Los Simpson</h2>

      <input
        type="text"
        placeholder="Buscar por nombre o ID..."
        className="search-input"
        value={searchTerm}
        onChange={handleSearch}
      />

      <p className="page-info2">
        {filteredCharacters.length} resultados encontrados
      </p>

      <div className="characters-grid">
        {visibleCharacters.length > 0 ? (
          visibleCharacters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))
        ) : (
          <p>No se encontraron personajes.</p>
        )}
      </div>

      {filteredCharacters.length > CHARACTERS_PER_PAGE && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default Characters;
