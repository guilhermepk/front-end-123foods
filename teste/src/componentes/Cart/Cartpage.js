import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';
import axios from 'axios';

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
          data.forEach((item) => {
            initialQuantities[item.id] = parseInt(item.amount);
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
      try {
       axios.delete(`http://localhost:3000/purchases/${dataId}`);
       Swal.fire( 'Sucesso ao excluir', 'success');
    } catch (error) {
        console.error('Erro ao excluir banner:', error);
    }

  };

  const handlePurchaseClick = () => {
    


  };

console.log("DATA:",data)

  return (
    <div>
      <h1>Meu Carrinho de Compras</h1>
      {data.map((item) => (
        <div key={item.id}>
          {item.food && item.image && item.image.path && (
            <img
              className="data-image"
              src={`http://localhost:3000/uploads/${item.image.path}`}
              alt="Imagem do Produto"
            />
          )}
          <p>Quantidade: {quantities[item.id]}</p>
          <button onClick={() => handleDecreaseClick(item.id)}>
            Diminuir Quantidade
          </button>
          <p className="button-qtd2">Qtd: {quantities[item.id]}</p>
          <button onClick={() => handleIncreaseClick(item.id)}>
            Aumentar Quantidade
          </button>
          <button onClick={() => handleRemoveClick(item.id)}>Remover</button>
        </div>
      ))}
      <button onClick={handlePurchaseClick}>Comprar</button>
    </div>
  );
};
export default Cartpage;
