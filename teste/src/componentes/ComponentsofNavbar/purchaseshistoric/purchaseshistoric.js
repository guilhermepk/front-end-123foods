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
    
      useEffect(() => {
        const storedToken = localStorage.getItem('payload');
        if (storedToken) {
          setToken(storedToken);
          const decodedToken = jwt_decode(storedToken);
          setDecodedToken(decodedToken);
        }
      }, []); 
      
      
      function createData(productID) {
        return {
          productID,
          history: [ 
            {
            quantitties: 3
            }
          ],
        };
      }
    
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
      
      // function Row(props) {
      //   const { row } = props;
      //   const [open, setOpen] = React.useState(false);

      //   return (
      //    <React.Fragment>
      //       <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
      //         <TableCell>
      //           <IconButton
      //             aria-label="expand row"
      //             size="small"
      //             onClick={() => setOpen(!open)}
      //           >
      //             {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      //           </IconButton>
      //         </TableCell>
      //         <TableCell component="th" scope="row">
      //           {row.data}
      //         </TableCell>
      //         <TableCell align="right">{row.productID}</TableCell>
      //         {/* <TableCell align="right">{row.quantitiesProduct}</TableCell>
      //         <TableCell align="right">{row.totalPrice}</TableCell>
      //         <TableCell align="right">{row.delivery}</TableCell> */}
      //       </TableRow>
      //       <TableRow>
      //         <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
      //           <Collapse in={open} timeout="auto" unmountOnExit>
      //             <Box sx={{ margin: 1 }}>
      //               <Typography variant="h6" gutterBottom component="div">
      //                 History
      //               </Typography>
      //               <Table size="small" aria-label="purchases">
      //                 <TableHead>
      //                   <TableRow>
      //                     <TableCell>Data de Compra</TableCell>
      //                     <TableCell>ID do Produto</TableCell>
      //                     <TableCell align="right">Quantidade</TableCell>
      //                   </TableRow>
      //                 </TableHead>
      //                 <TableBody>
      //                   {row.history.map((historyRow) => (
      //                     <TableRow key={historyRow.date}>
      //                       <TableCell component="th" scope="row">
      //                         {historyRow.date}
      //                       </TableCell>
      //                       {/* <TableCell>{historyRow.customerId}</TableCell>
      //                       <TableCell align="right">{historyRow.amount}</TableCell>
      //                       <TableCell align="right">
      //                         {Math.round(historyRow.amount * row.price * 100) / 100}
      //                       </TableCell> */}
      //                     </TableRow>
      //                   ))}
      //                 </TableBody>
      //               </Table>
      //             </Box>
      //           </Collapse>
      //         </TableCell>
      //       </TableRow>
      //     </React.Fragment>
      //   );
      // }

      // Row.propTypes = {
      //   row: PropTypes.shape({
      //     productID: PropTypes.number.isRequired,
      //     // quantitiesProduct: PropTypes.number,
      //     // totalPrice: PropTypes.number,
      //     // delivery: PropTypes.arrayOf(
      //     //   PropTypes.shape({
      //     //     buy: PropTypes.number,
      //     //     productID: PropTypes.string,
      //     //     quantities: PropTypes.string,
      //     //   }),
      //     // )
      //   }).isRequired,
      // };

      // const rows = data.map((cartItem) => createData(
      //   cartItem.productID,
      //   // cartItem.quantitiesProduct,
      //   // cartItem.totalPrice,
      //   // cartItem.delivery
      // ));

      // return (
      //     <TableContainer component={Paper}>
      //       <Table aria-label="collapsible table">
      //         <TableHead>
      //           <TableRow>
      //             <TableCell />
      //             <TableCell>Dessert</TableCell>
      //             <TableCell align="right">ID do Carrinho</TableCell>
      //             <TableCell align="right">Nº de Produtos&nbsp;</TableCell>
      //             <TableCell align="right">Preço Total&nbsp;</TableCell>
      //             <TableCell align="right">Entregue&nbsp;</TableCell>
      //           </TableRow>
      //         </TableHead>
      //         <TableBody>
      //           {rows.map((row) => (
      //             <Row key={row.data} row={row} />
      //           ))}
      //         </TableBody>
      //       </Table>
      //     </TableContainer>
      //   );
    
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
      
    

