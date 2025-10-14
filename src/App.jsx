// App.jsx
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import NavBar from './Components/NavBar/NavBar';
import Footer from './Components/Footer/Footer'; // <-- crear este componente
import Home from './Pages/Home/Home';            // <-- crear esta página
import Characters from './Pages/Characters/Characters';
import CharacterDetail from './Pages/CharacterDetail/CharacterDetail';
import Locations from './Pages/Locations/Locations';
import Episodes from './Pages/Episodes/Episodes'; 
import ScrollToTopButton from './Components/ScrollToTopButton/ScrollToTopButton'; // <-- crear este componente
import './App.css';

function App() {
  return (
    <HashRouter>
      <div className="app-root">
        {/* NavBar persistente */}
        <header>
          <NavBar />
        </header>

        {/* Main: cada ruta renderiza su contenido aquí */}
        <main className="app-main">
          <Routes>
            {/* Ruta Home */}
            <Route path="/" element={<Home />} />

            {/* Personajes */}
            <Route path="/personajes" element={<Characters />} />
            <Route path="/personaje/:id" element={<CharacterDetail />} />

            {/* Locaciones */}
            <Route path="/lugares" element={<Locations />} />

            {/* Episodios */}
            <Route path="/episodios" element={<Episodes />} />

            {/* Redirección por defecto */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Footer persistente */}
        <Footer />
        <ScrollToTopButton />
      </div>
    </HashRouter>
  );
}

export default App;
