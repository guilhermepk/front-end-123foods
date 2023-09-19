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

// import * as React from 'react';
// import PropTypes from 'prop-types';
// import Box from '@mui/material/Box';
// import Collapse from '@mui/material/Collapse';
// import IconButton from '@mui/material/IconButton';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// function createData(name, calories, fat, carbs, protein, price) {
//   return {
//     name,
//     calories,
//     fat,
//     carbs,
//     protein,
//     price,
//     history: [
//       {
//         date: '2020-01-05',
//         customerId: '11091700',
//         amount: 3,
//       },
//       {
//         date: '2020-01-02',
//         customerId: 'Anonymous',
//         amount: 1,
//       },
//     ],
//   };
// }

// function Row(props) {
//   const { row } = props;
//   const [open, setOpen] = React.useState(false);

//   return (
//     <React.Fragment>
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
//           {row.name}
//         </TableCell>
//         <TableCell align="right">{row.calories}</TableCell>
//         <TableCell align="right">{row.fat}</TableCell>
//         <TableCell align="right">{row.carbs}</TableCell>
//         <TableCell align="right">{row.protein}</TableCell>
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
//                     <TableCell>Date</TableCell>
//                     <TableCell>Customer</TableCell>
//                     <TableCell align="right">Amount</TableCell>
//                     <TableCell align="right">Total price ($)</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {row.history.map((historyRow) => (
//                     <TableRow key={historyRow.date}>
//                       <TableCell component="th" scope="row">
//                         {historyRow.date}
//                       </TableCell>
//                       <TableCell>{historyRow.customerId}</TableCell>
//                       <TableCell align="right">{historyRow.amount}</TableCell>
//                       <TableCell align="right">
//                         {Math.round(historyRow.amount * row.price * 100) / 100}
//                       </TableCell>
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
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
//   createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
//   createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
//   createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
// ];

// export default function CollapsibleTable() {
//   return (
//     <TableContainer component={Paper}>
//       <Table aria-label="collapsible table">
//         <TableHead>
//           <TableRow>
//             <TableCell />
//             <TableCell>Dessert (100g serving)</TableCell>
//             <TableCell align="right">Calories</TableCell>
//             <TableCell align="right">Fat&nbsp;(g)</TableCell>
//             <TableCell align="right">Carbs&nbsp;(g)</TableCell>
//             <TableCell align="right">Protein&nbsp;(g)</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <Row key={row.name} row={row} />
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }