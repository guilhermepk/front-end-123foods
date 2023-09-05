import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

const Cartpage = () => {
  const [token, setToken] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);
  const [data, setData] = useState([]);
  const [quantities, setQuantities] = useState({}); 
  const userId = decodedToken?.sub;

  useEffect(() => {
    const storedToken = localStorage.getItem('payload');
    if (storedToken) {
      setToken(storedToken);
      const decodedToken = jwt_decode(storedToken);
      setDecodedToken(decodedToken);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:3000/purchases/${userId}/previsto`)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          const initialQuantities = {};
          data.forEach((data) => {
            initialQuantities[data.id] = 1;
          });
          setQuantities(initialQuantities);
        })
        .catch((error) => {
          console.error('Erro ao buscar dados:', error);
        });
    }
  }, [userId]);

  const handleDecreaseClick = (dataId) => {
    if (quantities[dataId] > 1) {
      const newQuantities = { ...quantities };
      newQuantities[dataId] -= 1;
      setQuantities(newQuantities);
    }
  };

  const handleIncreaseClick = (dataId) => {
    const newQuantities = { ...quantities };
    newQuantities[dataId] += 1;
    setQuantities(newQuantities);
  };

  const handleRemoveClick = (dataId) => {
    // Implemente a lógica para remover o produto do carrinho aqui
  };

  const handlePurchaseClick = () => {
    // Implemente a lógica para processar a compra aqui
  };

  console.log("images", data[0].food); 

  return (
    <div>
      <h1>Meu Carrinho de Compras</h1>
      {data.map((data) => (
        <div key={data.id}>
          {data.images && data.images.length > 0 && (
            <img
              className="data-image"
              src={`http://localhost:3000/uploads/${data[data.id].images.path}`}
              alt="Imagem do Produto"
            />
          )}
          {/* <p>Produto: {data.food.name}</p> */}
          <p>Status: {data.status}</p>
          <p>Quantidade: {quantities[data.id]}</p>
          <button onClick={() => handleDecreaseClick(data.id)}>
            Diminuir Quantidade
          </button>
          <p className="button-qtd2">Qtd: {quantities[data.id]}</p>
          <button onClick={() => handleIncreaseClick(data.id)}>
            Aumentar Quantidade
          </button>
          <button onClick={() => handleRemoveClick(data.id)}>Remover</button>
        </div>
      ))}
      <button onClick={handlePurchaseClick}>Comprar</button>
    </div>
  );
};

export default Cartpage;
