import React, { useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import './Search.css';
import {BiMenu} from 'react-icons/bi';
import SearchModal from '../SearchModal/SearchModal';

const Search = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);

    if (value.trim().length > 0) {
      performSearch(value);
    }
  };

  const performSearch = (value) => {
    setSearchValue(value);
  };

  return (
    <>
      <div className="search">
        <div className="categorias">
          <BiMenu className="categoria-icon"/>
        </div>

        <input 
          type="text"
          placeholder="Pesquisar:"
          className="search-input"
          value={searchValue}
          onChange={handleInputChange}
        />

        <a className="lupa-a">
          <BiSearchAlt className="lupa" onClick={() => console.log('pesquisado')} />
        </a>    
      </div>
      <SearchModal value={searchValue}/>
    </>
  );
};

export default Search;