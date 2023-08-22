import React, { useState, useEffect } from "react";
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'

import './HomeProductLister.css'
import { Pagination } from "react-bootstrap";

const  HomeProductLister = () => {
    const [products, setProducts] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 4;

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        for(let x = 0; x < pages.length; x++){
            if (pages[x] === currentPage){
                console.log('aaaaa', pages[x])
            }
        }
    };

    const pages = Array.from({ length: Math.ceil(products.length / productsPerPage) });

    useEffect(() => {
        fetch('http://localhost:3000/foods')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
            });
    }, []);

    const Pag = () => {
        return (
            <Pagination className="pages">
                {pages.map((_, index) => (
                    <Pagination.Item className="page"
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        );
    }

    return (
        <div className="divList">
            <Pag/>
            <li className='cardList'>
                {currentProducts.map((product, index) => (
                    <Col key={index}>
                        <Card className="cardProduct">
                            <a href={`/product/${product.id}`}>
                                <div className="divImg">
                                    <Card.Img className="cardImg"
                                        src={`http://localhost:3000/uploads/${product.images[0]?.path}`}
                                        onLoad={() => console.log(`Imagem carregada: /uploads/${product.images[0]?.path}`)}
                                        onError={() => console.log(`Erro ao carregar a imagem: /uploads/${product.images[0]?.path}`)}
                                    />
                                    <p>{product.name}</p>
                                    <p>{product.brand}</p>
                                    <p>R$ {product.price}</p>
                                </div>
                            </a>
                        </Card>
                    </Col>
                ))}
            </li>
            <Pag/>
        </div>
    );
}

export default HomeProductLister;