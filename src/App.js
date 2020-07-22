import React, { useState, useEffect } from 'react';
import Pokemons from './components/Pokemons';
import Pagination from './components/Pagination';
import axios from 'axios';
import './App.css';

const App = () => {
  const [pokes, setPokes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokesPerPage] = useState(20);

  useEffect(() => {
    const fetchPokes = async () => {
      setLoading(true);
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=200');
      setPokes(res.data.results);
      setLoading(false);
    };

    fetchPokes();
  }, []);

  // Get current posts
  const indexOfLastPokes = currentPage * pokesPerPage;
  const indexOfFirstPokes = indexOfLastPokes - pokesPerPage;
  const currentPokes = pokes.slice(indexOfFirstPokes, indexOfLastPokes);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className='container'>
      <h1 className='text-primary'>Pokemons</h1>
      <Pokemons pokes={currentPokes} loading={loading} />
      <Pagination
        pokesPerPage={pokesPerPage}
        totalPokes={pokes.length}
        paginate={paginate}
      />
    </div>
  );
};

export default App;