import React, { useState, useEffect } from 'react';
import './filtrocat.css';

const Filtrocat = () => {
  const categories = ['promoções', 'salgados', 'doces', 'bebidas', 'naturais'];
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
    <p className="navbarcat">
      {categories.map((category, index) => (
        <button className='button' key={index} onClick={() => handleCategoryClick(category)}>
          {category}
        </button>
      ))}
    </p>
  );
};

export default Filtrocat;
