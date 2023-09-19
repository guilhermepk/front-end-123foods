import React, { useState, useEffect } from 'react';
import { useUserinfo } from '../Userinfo/Userinfo';
import jwt_decode from 'jwt-decode';
import './Purchaseshistoric.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IoIosClose } from 'react-icons/io';


const Purchaseshistoric=()=>{
      const [token, setToken] = useState(null);
      const [decodedToken, setDecodedToken] = useState(null);
      const [data, setData] = useState([]);
      const [groupedProducts, setGroupedProducts] = useState({});
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
          fetch(`http://localhost:3000/purchases/${userId}/entregue`)
            .then((response) => response.json())
            .then((data) => {
              setData(data);
            })
            .catch((error) => {
              console.error('Erro ao buscar dados:', error);
            });
        }
      }, [userId]);
    
      useEffect(() => {
        const groupedProducts = {};
        data.forEach((product) => {
          const updatedAt = new Date(product.updatedAt);
          const key = updatedAt.toISOString().substring(0, 16);
          if (!groupedProducts[key]) {
            groupedProducts[key] = {
              date: updatedAt,
              products: [],
            };
          }
          groupedProducts[key].products.push(product);
        });
        setGroupedProducts(groupedProducts);
      }, [data]);
      return (
        <TableContainer className='table-historic-content'>
          <div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell >Produto</TableCell>
                  <TableCell >Quantidade</TableCell>
                  <TableCell >Preço</TableCell>
                  <TableCell> Entregue: </TableCell>
                </TableRow>
              </TableHead>
              {Object.values(groupedProducts).map((group) => (
                <TableBody>
                  {group.products.map((product) => (
                    <TableRow key={product.id} >
                      <TableCell >
                        <IoIosClose />
                          {product && product.image && product.image.path && (
                            <img
                              className="data-image"
                              src={`http://localhost:3000/uploads/${product.image.path}`}
                              alt="Imagem do Produto"
                            />
                          )}
                            <p >{product.name}</p>
                          </TableCell>
                          <TableCell>
                            <p>Quant: {product.amount} </p>
                          </TableCell>
                          <TableCell>
                            <p >R$ {product.price} </p>
                          </TableCell>
                          <TableCell>
                            <p> {group.date.getDate()}/{group.date.getMonth() + 1}</p>
                          </TableCell>        
                    </TableRow> 
                  ))};
                </TableBody>
              ))};
            </Table>
          </div>
        </TableContainer>
        // <div className='table-purchase-historic'>
        //   {/* <h1>Histórico de Compras</h1> */}
        //   {Object.values(groupedProducts).map((group) => (
        //     <div className='purchases-by-date' key={group.date}>
        //     <h4>Entregue dia: {group.date.getDate()}/{group.date.getMonth() + 1}</h4>
        //       <ul>
        //         {group.products.map((product) => (
        //           <li key={product.id}>
        //           <p>nome{}</p>
        //             <img src={`http://localhost:3000/uploads/${product.image.path}`} alt="Imagem da compra" />
        //             <p>Status: {product.status}</p>
        //             <p>Quantidade: {product.amount}</p>
        //           </li>
        //         ))}
        //       </ul>
        //     </div>
        //   ))}
        // </div>
      );
    }
export default Purchaseshistoric;