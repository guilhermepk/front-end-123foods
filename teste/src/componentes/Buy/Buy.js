import jwt_decode from 'jwt-decode';
import React, { useState, useEffect } from "react";

const Buy = ({ productId, qtd, products}) => {
  const [token, setToken] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('payload');
    if (storedToken) {
      setToken(storedToken);
      const decodedToken = jwt_decode(storedToken);
      setDecodedToken(decodedToken);
    }
  }, []);

};

export const sendPurchaseRequest = async (productId, qtd, token,imagem) => {
  try {
    if (!token) {
      console.error('Token não encontrado.');
      return;
    }
    const userId = token ? jwt_decode(token)?.sub : null;
{console.log('imagemId',imagem)}
    const orderData = {
      productId: parseInt(productId),
      amount: qtd,
      userId: userId,
      
      imageId: parseInt(imagem),
      status: 'previsto',
    };
    const response = await fetch('http://localhost:3000/purchases', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
      body: JSON.stringify(orderData),
    });
    

  } catch (error) {
    console.error('Erro inesperado:', error);
  }
};

export default Buy;