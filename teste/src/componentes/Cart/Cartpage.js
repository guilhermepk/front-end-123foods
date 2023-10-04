import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import './Cart.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IoIosClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import iziToast from 'izitoast'; 
import 'izitoast/dist/css/iziToast.min.css';

const Cartpage = () => {
  const [decodedToken, setDecodedToken] = useState(null);
  const [data, setData] = useState([]);
  const [quantities, setQuantities] = useState({});
  const userId = decodedToken?.sub;
  const navigate = useNavigate();
  useEffect(() => {
    const storedToken = localStorage.getItem('payload');
    if (storedToken) {
      const decodedToken = jwt_decode(storedToken);
      setDecodedToken(decodedToken);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetch(`${process.env.REACT_APP_HOST}/purchases/${userId}/previsto`)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          console.log("data produto:",data)
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

  const handleIncreaseClick = (dataId,productamount) => {
    if(quantities[dataId]<100){
      if(quantities[dataId]<productamount){
        const newQuantities = { ...quantities };
        newQuantities[dataId] += 1;
        setQuantities(newQuantities);
      }
      else {
        try{const newQuantities = { ...quantities };
        newQuantities=productamount
        setQuantities(newQuantities)}
        catch{
          iziToast.error({position: 'bottomRight',timeout: 5000,message:"Limite de produtos atingido"
        })
        };
      }
    }else{
      try{const newQuantities = { ...quantities };
      newQuantities=100
      setQuantities(newQuantities)}
      catch{
        iziToast.error({position: 'bottomRight',timeout: 5000,message:"Limite de produtos atingido"
      })
      };
    }
  };

  const handleRemoveClick = async (dataId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_HOST}/purchases/${dataId}`);
      iziToast.success({position: 'bottomRight',timeout: 5000,onClosed:setTimeout(() => { 
        window.location.reload(); 
      }, 2000),message:"Item Excluido concluída com sucesso "
      })
      
    } catch (error) {
      console.error('Erro ao excluir banner:', error);
    }
  };
  const handlePurchaseClick = async (data, quantities) => {
    try {
      console.log("data:", data);
      const productRequests = data.map(async (item) => {
        const productId = item.product.id;
        const newQuantity = item.product.amount - quantities[item.id];
  
        console.log('Atualizando estoque para o produto ', productId);
        console.log('Nova quantidade:', newQuantity);
  
        await axios.patch(`${process.env.REACT_APP_HOST}/products/${productId}`, {
          amount: newQuantity,
        });
        console.log(`Atualização de quantidade para o produto ${productId} concluída.`);
      });
      const purchaseRequests = data.map(async (item) => {
        const purchaseId = item.id;

        const newAmount = quantities[item.id];
  
        await axios.patch(`${process.env.REACT_APP_HOST}/purchases/${purchaseId}`, {
          amount: newAmount,
          status:'comprado',
        });
      });
  
     
      await Promise.all([...productRequests, ...purchaseRequests]);
  
      iziToast.success({position: 'bottomRight',timeout: 5000,onClosed: navigate('/'),message:"compra concluída com sucesso "
      })
    } catch (error) {
      console.error('Erro ao atualizar quantidades dos produtos ou detalhes das compras:', error);
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
                      src={`${process.env.REACT_APP_HOST}/uploads/${item.image.path}`}
                      alt="Imagem do Produto"
                    />
                  )}{console.log(item.image)}
                  <p className='product-name-table'>{item.product.name}</p>
                </TableCell>
                <TableCell className='cell quant-add-decrease'>
                  <button className='button-quant decrease' onClick={() => handleDecreaseClick(item.id)}>
                    -
                  </button>
                  <p className="quant-total">Quant: {quantities[item.id]}</p>
                  <button className='button-quant add' onClick={() => handleIncreaseClick(item.id,item.product.amount)}>
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
