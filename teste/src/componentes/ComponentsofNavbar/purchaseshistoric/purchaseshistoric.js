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
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { IoIosClose } from 'react-icons/io';
import { Box, Collapse, IconButton } from '@mui/material';



const Purchaseshistoric=()=>{
      const [token, setToken] = useState(null);
      const [decodedToken, setDecodedToken] = useState(null);
      const [data, setData] = useState([]);
      const [historic, setHistoric] = useState([]);
      const [groupedProducts, setGroupedProducts] = useState({});
      const userId = decodedToken?.sub;
      const [open, setOpen] = React.useState(false);
    
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
              setHistoric(data);
            })
            .catch((error) => {
              console.error('Erro ao buscar dados:', error);
            });
        }
      }, [userId]);
    
      useEffect(() => {
        const groupedProducts = {};
        data.forEach((item) => {
          const updatedAt = new Date(item.updatedAt);
          const key = updatedAt.toISOString().substring(0, 16);
          if (!groupedProducts[key]) {
            groupedProducts[key] = {
              date: updatedAt,
              products: [], 
            };
          }
          groupedProducts[key].products.push(item);
        });
        setGroupedProducts(groupedProducts);
      }, [data]);
      console.log("historico",historic);
  

        return (
          <>
          {historic.length > 0 && (
            <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
              <TableCell component="th" scope="row">
                <TableContainer>
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell>ID do Carrinho</TableCell>
                      <TableCell align="right">Produtos</TableCell>
                      <TableCell align="right">Nº de Produtos&nbsp;</TableCell>
                      <TableCell align="right">Preço Total&nbsp;</TableCell>
                      <TableCell align="right">Entregue&nbsp;</TableCell>
                    </TableRow>
                  </TableHead>
                </TableContainer>
              </TableCell>
            </TableRow>
            <TableCell>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
              <TableCell align='right'>SLAAA</TableCell>
              <TableCell>{historic[0].product.name}</TableCell>
              <TableCell align="right">{historic.length}</TableCell>
              <TableCell>N sei ainda como fazer</TableCell>
              <TableCell>{historic[0].updatedAt}</TableCell>
            <TableRow>
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box sx={{ margin: 1 }}>
                    <Typography variant="h6" gutterBottom component="div">
                      Histórico
                    </Typography>
                    <Table size="small" aria-label="purchases">
                      <TableHead>
                        <TableRow>
                          <TableCell>Produto</TableCell>
                          <TableCell>Quantidade</TableCell>
                          <TableCell align="right">Preço</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {historic.map((historyRow) => (
                          <TableRow key={historyRow} >
                            <TableCell> {historyRow.product.name} </TableCell>
                            <TableCell>{historyRow.amount}</TableCell>
                            <TableCell align="right">
                              {Math.round(historyRow.amount * historyRow.product.price *100)/100}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
          </React.Fragment>
          )}
          </>
        );
}

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
        //                       src={`http://localhost:3000/uploads/${product.image.path}`}
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
        //             <img src={`http://localhost:3000/uploads/${product.image.path}`} alt="Imagem da compra" />
        //             <p>Status: {product.status}</p>
        //             <p>Quantidade: {product.amount}</p>
        //           </li>
        //         ))}
        //       </ul>
        //     </div>
        //   ))}
        // </div>
      
    

