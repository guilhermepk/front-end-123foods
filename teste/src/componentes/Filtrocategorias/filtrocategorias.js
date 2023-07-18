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

  useEffect(() => {
    // Faz a requisição inicial (por exemplo, quando o componente é montado)
    handleCategoryClick('promoções');
  }, []);

  return (
    <nav className="navbarcat">
      {categories.map((category, index) => (
        <button key={index} onClick={() => handleCategoryClick(category)}>
          {category}
        </button>
      ))}
      {/* Renderize aqui os alimentos (foods) retornados da requisição */}
      <div className="foods-container">
        {foods.map((food) => (
          <div key={food.id}>
            <p>{food.name}</p>
            <p>{food.category}</p>
            {/* Adicione outras informações sobre o alimento, se necessário */}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Filtrocat;
