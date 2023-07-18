import React from 'react';
import { useState } from 'react'; 
import { BiSearchAlt } from 'react-icons/bi';
import './Search.css';

const Search = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);

    // Verifica se o comprimento do valor de pesquisa é maior ou igual a três
    if (value.trim().length >= 3) {
      performSearch(value);
    }
  };

  const performSearch = (value) => {
    const apiUrl = `http://localhost:3000/foods/search?filterValue=${encodeURIComponent(value)}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Erro ao buscar alimentos:', error);
      });
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Pesquisar:"
        className="search-input"
        value={searchValue}
        onChange={handleInputChange}
      />
      <BiSearchAlt className="lupa" onClick={() => performSearch(searchValue)} />
    </div>
  );
};

export default Search;
