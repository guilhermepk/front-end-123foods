import React, { useState, useEffect } from 'react';
import './filtrocat.css';
import HomeProductLister from '../HomeProductLister/HomeProductLister';

const Filtrocat = () => {
  const categories = ['PROMOÇÕES', 'SALGADOS', 'DOCES', 'BEBIDAS', 'NATURAIS'];
  const [foods, setFoods] = useState([]);

  const handleCategoryClick = (category) => {
    fetch(`http://localhost:3000/foods/filter/category/${category}`)
      .then((response) => response.json())
      .then((data) => {
        setFoods(data);
      })
      .catch((error) => {
        console.error(`Erro ao buscar alimentos da categoria ${category}:`, error);
      });
  };
  console.log(foods)

  useEffect(() => {
    handleCategoryClick('promoções');
  }, []);

  return (
    <div>
      <p className="navbarcat">
        {categories.map((category, index) => (
          <button className='button-category' key={index} onClick={() => handleCategoryClick(category)}>
            {category}
          </button>
        ))}
      </p>

      <HomeProductLister/>
    </div>
  );
};

export default Filtrocat;
