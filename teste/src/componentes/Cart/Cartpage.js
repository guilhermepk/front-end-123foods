import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';
import axios from 'axios';
import './Cart.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { IoIosClose } from 'react-icons/io';
import Footer from '../Footer/Footer';


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

  const handleRemoveClick = async (dataId) => {
    try {
      await axios.delete(`http://localhost:3000/purchases/${dataId}`);
      Swal.fire('Sucesso ao excluir', 'success');
      setTimeout(() => { 
        window.location.reload(); 
      }, 2000);
    } catch (error) {
      console.error('Erro ao excluir banner:', error);
    }
  };

  const handlePurchaseClick = async (data, quantities) => {
    try {
      const requests = data.map(async (item) => {
        const formData = new FormData();
        formData.append('amount', quantities[item.id]);
  
        const response = await axios.patch(`http://localhost:3000/purchases/${item.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        console.log(`Upload response for product ${item.id}:`, response.data);
      });
  
      await Promise.all(requests);
    } catch (error) {
      console.error('Erro ao fazer upload dos produtos:', error);
    }
  };

  const CalcTotalPrice = (item) => {
    return item.product.price * quantities[item.id];
  };
  

  return (
    <TableContainer className='table-container'>
      <div className='table'>
        <Table>
          <TableHead>
            <TableRow className='table-titles-row'>
              <TableCell className='table-cell food'>Produto</TableCell>
              <TableCell className='table-cell quant'>Quantidade</TableCell>
              <TableCell className='table-cell price'>Preço</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id} className='product-complet'>
                <TableCell className='cell image-name'>
                    <IoIosClose className="close-cart" onClick={() => handleRemoveClick(item.id)}/>
                  {item.product && item.image && item.image.path && (
                    <img
                      className="data-image"
                      src={`http://localhost:3000/uploads/${item.image.path}`}
                      alt="Imagem do Produto"
                    />
                  )}
                  <p className='product-name-table'>{item.product.name}</p>
                </TableCell>
                <TableCell className='cell quant-add-decrease'>
                  <button className='button-quant decrease' onClick={() => handleDecreaseClick(item.id)}>
                    -
                  </button>
                  <p className="quant-total">Quant: {quantities[item.id]}</p>
                  <button className='button-quant add' onClick={() => handleIncreaseClick(item.id)}>
                    +
                  </button>
                </TableCell>
                <p className='product-total-price'>R$ {CalcTotalPrice(item).toFixed(2)}</p>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <button className='button-pay' onClick={() => handlePurchaseClick(data, quantities)}>Comprar</button>
      </div>
    </TableContainer>
  );
};

export default Cartpage;
