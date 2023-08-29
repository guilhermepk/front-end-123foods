import './Filtercategories.css';

import React, { useState, useEffect } from 'react';
import HomeProductLister from '../HomeproductLister/HomeproductLister';

const Filtercategories = () => {
  const categories = ['PROMOÇÕES', 'SALGADOS', 'DOCES', 'BEBIDAS', 'NATURAIS'];
  const [category, setCategory] = useState('promoções')

  return (
    <div>
      <p className="navbarcat">
        {categories.map((category, index) => (
          <button className='button-category' key={index} onClick={() => setCategory(category)}>
            {category}
          </button>
        ))}
      </p>

      <HomeProductLister category={category} />
    </div>
  );
};

export default Filtercategories;
