import './App.css';
import Product from './componentes/Carrinho/Product';
import Cart from './componentes/Carrinho/Cart';
import { useState } from 'react';

  const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (product) => {
    const updatedCart = cart.filter((item) => item.id !== product.id);
    setCart(updatedCart);
  };

  const products = [
    { id: 1, name: 'Produto 1', price: 9.99 },
    { id: 2, name: 'Produto 2', price: 14.99 },
    { id: 3, name: 'Produto 3', price: 19.99 },
  ];

  return (
    <div>
      <h1>Loja</h1>
      <div>
        {products.map((product) => (
          <Product key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
      <Cart cart={cart} removeFromCart={removeFromCart} />
    </div>
  );
};

export default App;