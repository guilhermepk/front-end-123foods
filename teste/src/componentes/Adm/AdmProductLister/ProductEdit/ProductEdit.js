import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const ProductEdit = (props) => {
    const [product, setProduct] = useState(null);
    const [productItems, setProductItems] = useState([]);
    const [inputValue, setInputValue] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:3000/products/${props.productId}`)
            .then((response) => response.json())
            .then((data) => {
                setProduct(data);
            });

        let items = []
        for(let item in product){
            items.push(item)
        }
        setProductItems([...items])
    }, [props.productId]);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
    }

    productItems.map((item) => {
        if(item === 'weight'){
            const start = productItems.indexOf('weight')+1
            productItems.splice(productItems.indexOf('units_of_measurements'), 1)
            productItems.splice(start, 0, 'units_of_measurements')
        }
    })

    const unwantedItems = [
        'id',
        'createdAt',
        'updatedAt',
        'deletedAt'
    ]

    const inList = (item, list) => {
        let isIn = false;
        for(let x = 0; x < list.length; x++){
            if (list[x] === item) isIn = true;
        }

        return isIn;
    }

    return(
        <div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell> <h2>Nome do campo</h2> </TableCell>
                            <TableCell> <h2>Mudar disso:</h2> </TableCell>
                            <TableCell> <h2>Para isso:</h2> </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {product && productItems.map((item, index) => (
                            <TableRow key={index}>
                                {inList(item, unwantedItems) === false && (
                                    <>
                                    <TableCell> {item} </TableCell>

                                    {typeof(product[item]) !== 'object' && (
                                        <>
                                        <TableCell> {product[item]} </TableCell>
                                        <TableCell>
                                            <input
                                                type='text'
                                                value={inputValue}
                                                onChange={handleInputChange}
                                            />
                                        </TableCell>
                                        </>
                                    )}
                                    {item === 'images' && (
                                        <TableCell>
                                            <img src={`http://localhost:3000/uploads/${product.images[0].path}`} />
                                        </TableCell>
                                    )}
                                    {item === 'units_of_measurements' && (
                                        <>
                                        <TableCell> {product[item].name} </TableCell>
                                        </>
                                    )}
                                    </>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default ProductEdit;