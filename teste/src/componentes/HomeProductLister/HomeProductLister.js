import React, { useState, useEffect } from "react";
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'

import './HomeProductLister.css'

const HomeProductLister = () => {
    const [products, setProducts] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(5);

    useEffect(() => {
        fetch('http://localhost:3000/foods')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
            });
    }, []);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageButtons = document.getElementsByClassName('pageButton');
    for(let x = 0; x< pageButtons.length; x++){
        if(pageButtons[x].textContent == currentPage){
            pageButtons[x].className = 'currentPageButton'
        }
    }


    const Pag = () => {
        return (
            <div className="pagination">
                {Array.from({ length: Math.ceil(products.length / productsPerPage) }).map((_, index) => (
                    <button key={index} onClick={() => paginate(index + 1)} className="pageButton">
                        {index + 1}
                    </button>
                ))}
            </div>
        );
    }

    return (
        <div className="divList">
            <Pag/>
            <ul className='cardList'>
                {currentProducts.map((product, index) => (
                    <Col key={index} className="cardCol">
                        <Card className="cardProduct">
                            <a href={`/product/${product.id}`} className="linkCard">
                                <div className="nameDiv">
                                    <h1 className="productName">{product.name}</h1>
                                </div>
                                <Card.Img className="cardImg"
                                    src={`http://localhost:3000/uploads/${product.images[0]?.path}`}
                                    onLoad={() => console.log(`Imagem carregada: /uploads/${product.images[0]?.path}`)}
                                    onError={() => console.log(`Erro ao carregar a imagem: /uploads/${product.images[0]?.path}`)}
                                />
                                <div className="cardTexts">
                                    <p>{product.brand}</p>
                                    <p>R$ {product.price}</p>
                                </div>
                            </a>
                        </Card>
                    </Col>
                ))}
            </ul>
            <Pag/>
        </div>
    );
}

export default HomeProductLister;