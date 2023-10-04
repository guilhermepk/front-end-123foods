import React, { useState, useEffect } from 'react';
import { useUserinfo } from '../../User/Userinfo/Userinfo';
import jwt_decode from 'jwt-decode';
import './Purchaseshistoric.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {Collapse, IconButton } from '@mui/material';



const Purchaseshistoric=()=>{
      const [token, setToken] = useState(null);
      const [decodedToken, setDecodedToken] = useState(null);
      const [data, setData] = useState([]);
      const [historic, setHistoric] = useState([]);
      const [groupedProducts, setGroupedProducts] = useState({});
      const userId = decodedToken?.sub;
      const [open, setOpen] = useState(false);
    
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
          fetch(`${process.env.REACT_APP_HOST}/purchases/${userId}/entregue`)
            .then((response) => response.json())
            .then((data) => {
              setHistoric(data);

            })
            .catch((error) => {
              console.error('Erro ao buscar dados:', error);
            });
        }
      }, [userId]);
    
      useEffect(() => {
        const groupedProducts = {};
        historic.forEach((item) => {
          const updatedAt = new Date(item.updatedAt);
          const key = updatedAt.toISOString().substring(0, 10);
          if (!groupedProducts[key]) {
            groupedProducts[key] = {
              date: updatedAt,
              products: [] 
            };
          }
          // for(const key in groupedProducts){
          //   groupedProducts[key].products.map((purchase) => {
          //     console.log(key, purchase.product.name)
          //   })
          // }
          groupedProducts[key].products.push(item);
        });
        setGroupedProducts(groupedProducts);
      }, [historic]);


      console.log("historico",historic);
      console.log("Agrupamento por data: ", groupedProducts) 


        return (
          <>
          <TableContainer className='table-container-header' >
            <TableHead>
              <TableRow className='table-container-row'>
                <TableCell className='table-title id-cart'>ID</TableCell>
                <TableCell className='table-title purchase'>Produtos</TableCell>
                <TableCell className='table-title purchase-number'>Nº de Produtos&nbsp;</TableCell>
                <TableCell className='table-title total-price'>Preço Total&nbsp;</TableCell>
                <TableCell className='table-title delivery-date'>Data da Entrega&nbsp;</TableCell>
              </TableRow>
            </TableHead>
          </TableContainer>
          {groupedProducts != null ? (
            // groupedProducts[key].products.map((purchase) => {
            <React.Fragment>
                <TableContainer className='table-container-results'>
                    <TableCell className='table-result id-cart'>
                      <IconButton
                      className='icon-expand'
                      aria-label="expand row"
                      onClick={() => setOpen(!open)}
                      >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                      </IconButton>{groupedProducts[0].id}
                    </TableCell>
                    <TableCell className='table-result purchase-name'>
                      {groupedProducts[0] && groupedProducts[0].image && groupedProducts[0].image.path && (
                             <img
                               className="historic-product-image"
                               src={`${process.env.REACT_APP_HOST}/uploads/${groupedProducts[0].image.path}`}
                               alt="Imagem do Produto"
                             />
                             )}{groupedProducts[0].name}...</TableCell>
                    <TableCell className='table-result purchase-number'>{groupedProducts.length}</TableCell>
                    <TableCell className='table-result total-price'>R$ 145,89</TableCell>
                    <TableCell className='table-result delivery-date'>{new Date(groupedProducts[0].updatedAt).toLocaleDateString()}</TableCell>
              </TableContainer>
                <Collapse className='table-container-historic-complet' in={open} timeout="auto" unmountOnExit>
                    <Table >
                      <TableHead >
                        <TableRow >
                          <TableCell className='title-little-table witch-product'>Produto</TableCell>
                          <TableCell className='title-little-table quantities-product'>Quantidade</TableCell>
                          <TableCell className='title-little-table price-per-product'>Preço</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {groupedProducts.map((historyRow) => (
                          <TableRow key={historyRow} >
                            <TableCell className='cell-historic all-product-name'> {historyRow.product.name} </TableCell>
                            <TableCell className='cell-historic all-product-quantities'>{historyRow.amount}</TableCell>
                            <TableCell className='cell-historic all-product-total-price'> R$ 
                              {Math.round(historyRow.amount * historyRow.product.price *100)/100}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                </Collapse>
          </React.Fragment>
          // })
          ) : (
            <div className='null'>
              Não foram feitas compras
            </div>
          )}
          </>
          
        );
};

export default Purchaseshistoric;
        
        // <TableContainer className='table-historic-content'>
        //   <div>
        //     <Table>
        //       <TableHead>
        //         <TableRow>
        //           <TableCell >Produto</TableCell>
        //           <TableCell >Quantidade</TableCell>
        //           <TableCell >Preço</TableCell>
        //           <TableCell> Entregue: </TableCell>
        //         </TableRow>
        //       </TableHead>
        //       {Object.values(groupedProducts).map((group) => (
        //         <TableBody>
        //           {group.products.map((product) => (
        //             <TableRow key={product.id} >
        //               <TableCell >
        //                 <IoIosClose />
        //                   {product && product.image && product.image.path && (
        //                     <img
        //                       className="data-image"
        //                       src={`${process.env.REACT_APP_HOST}/uploads/${product.image.path}`}
        //                       alt="Imagem do Produto"
        //                     />
        //                   )}
        //                     <p >{product.name}</p>
        //                   </TableCell>
        //                   <TableCell>
        //                     <p>Quant: {product.amount} </p>
        //                   </TableCell>
        //                   <TableCell>
        //                     <p >R$ {product.price} </p>
        //                   </TableCell>
        //                   <TableCell>
        //                     <p> {group.date.getDate()}/{group.date.getMonth() + 1}</p>
        //                   </TableCell>        
        //             </TableRow> 
        //           ))}
        //         </TableBody>
        //       ))}
        //     </Table>
        //   </div>
        // </TableContainer>


        // <div className='table-purchase-historic'>
        //   {/* <h1>Histórico de Compras</h1> */}
        //   {Object.values(groupedProducts).map((group) => (
        //     <div className='purchases-by-date' key={group.date}>
        //     <h4>Entregue dia: {group.date.getDate()}/{group.date.getMonth() + 1}</h4>
        //       <ul>
        //         {group.products.map((product) => (
        //           <li key={product.id}>
        //           <p>nome{}</p>
        //             <img src={`${process.env.REACT_APP_HOST}/${product.image.path}`} alt="Imagem da compra" />
        //             <p>Status: {product.status}</p>
        //             <p>Quantidade: {product.amount}</p>
        //           </li>
        //         ))}
        //       </ul>
        //     </div>
        //   ))}
        // </div>
      
    

