import React, { useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import './Search.css';

const Search = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);

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
      <button className="search-button" onClick={() => performSearch(searchValue)}>
        <BiSearchAlt />
      </button>
    </div>
  );
};

export default Search;

