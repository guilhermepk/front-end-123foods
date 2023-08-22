import React, { useState, useEffect } from "react";
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'

// import "bootstrap/dist/css/bootstrap.min.css";
import './HomeProductLister.css'
import ProductPage from "../ProductPage/ProductPage";

const HomeProductLister = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/foods')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
            });
    }, []);

    const card = document.getElementsByClassName('cardProduct');
    card.onClick = (productId) => {
        //window.location.assign(`/product/${productId}`)
        console.log(`clicaram no id ${productId}`)
    };

    return (
        <div>
            <li className='cardList'>
            {products.map((product, index) => (
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
        </div>
    );
}

export default HomeProductLister;