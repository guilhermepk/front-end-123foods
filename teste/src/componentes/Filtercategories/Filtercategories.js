import './Filtercategories.css';

import React, { useState, useEffect } from 'react';
import HomeProductLister from '../HomeproductLister/HomeproductLister';

const Filtercategories = () => {
  const categories = ['PROMOÇÕES', 'SALGADOS', 'DOCES', 'BEBIDAS', 'NATURAIS'];
  const [category, setCategory] = useState(null)
  const [clicked, setClicked] = useState(null);

  return (
    <div>
      <ul className="navbarcat">
        {categories.map((category, index) => (
          <button
            className={clicked == category ? 'category-clicked' : 'button-category'}
            key={index}
            onClick={() => {
              if(clicked == category){
                setClicked(null)
                setCategory(null)
              }else{
                setClicked(category)
                setCategory(category)
              }
            }}
          >
            {category}
          </button>
        ))}
      </ul>

      <HomeProductLister category={category} />
    </div>
  );
};

export default Filtercategories;
