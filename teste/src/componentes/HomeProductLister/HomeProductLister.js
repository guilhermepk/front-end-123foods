import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'
// import "bootstrap/dist/css/bootstrap.min.css";

import './HomeProductLister.css'

const HomeProductLister = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/foods')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
            });
    }, []);

    return (
        <div>
            <li className='cards'>
            {products.map((product, index) => (
                <Col key={index} md={4} className="colCards">
                    <Card className="productCard">
                        <Card.Header className="cardHeader">
                            {product.name}
                        </Card.Header>
                        <Card.Body>
                            <Card.Img
                                src={`http://localhost:3000/uploads/${product.images[0]?.path}`}
                                onLoad={() => console.log(`Imagem carregada: /uploads/${product.images[0]?.path}`)}
                                onError={() => console.log(`Erro ao carregar a imagem: /uploads/${product.images[0]?.path}`)}
                            />
                            <p>R$ {product.price}</p>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
            </li>
        </div>
    );
}

export default HomeProductLister;
