import React, { useState, useEffect } from "react";
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'
import { sendPurchaseRequest } from '../Buy/Buy'; 
import './HomeproductLister.css'

const HomeproductLister = (props) => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(5);
    const [qtd, setQtd] = useState(1);
    const [token, setToken] = useState(null);
    useEffect(() => {
        setCurrentPage(1);
        if(props.category) {
            fetch(`http://localhost:3000/foods/filter/category/${props.category}`)
                .then((response) => response.json())
                .then((data) => setProducts(data))
        }else{
            fetch(`http://localhost:3000/foods`)
                .then((response) => response.json())
                .then((data) => setProducts(data))
        }
    }, [props.category]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    const Pag = () => {
        return (
            <div className="pagination">
                {Array.from({ length: Math.ceil(products.length / productsPerPage) }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={index+1 === currentPage ? 'currentPageButton' : 'pageButton'}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        );
    }

    const handleBuyClick = (productId) => {
        console.log('Clicou em Comprar'); 
        console.log('productId:', productId); 
        console.log('qtd:', qtd);
        console.log('token:', token);
        sendPurchaseRequest(productId, qtd, token);
    };
    useEffect(() => {
        const storedToken = localStorage.getItem('payload');
        if (storedToken) {
          setToken(storedToken);
        }
      }, []);
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

                                {
                                    product.images
                                    &&
                                    <Card.Img className="cardImg"
                                        src={`http://localhost:3000/uploads/${product.images[0]?.path}`}
                                        //onLoad={() => console.log(`Imagem carregada: /uploads/${product.images[0]?.path}`)}
                                        onError={() => console.log(`Erro ao carregar a imagem: /uploads/${product.images[0]?.path}`)}
                                    />
                                }

                                <div className="cardTexts">
                                    <p>{product.brand}</p>
                                    <p>R$ {product.price}</p>
                                   
                                </div>

                            </a> 
                            <button className="button" onClick={() => handleBuyClick(product.id)}>Comprar</button>


                        </Card>
                    </Col>
                ))}
            </ul>
            {currentProducts.length === 0 && props.category &&(
                <p className="no-product">Nenhum produto encontrado para a categoria {props.category}</p>
            )}
            <Pag/>
        </div>
    );
}

export default HomeproductLister;