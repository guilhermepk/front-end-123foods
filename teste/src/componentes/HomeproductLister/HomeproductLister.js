import React, { useState, useEffect } from "react";
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { sendPurchaseRequest } from '../Buy/Buy'; 
import './HomeproductLister.css'
import { Link } from "react-router-dom";

const HomeproductLister = (props) => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(15);
    const [qtd, setQtd] = useState(1);
    const [token, setToken] = useState(null);
    useEffect(() => {
        setCurrentPage(1);
        if(props.category) {
            fetch(`http://localhost:3000/products/filter/category/${props.category}`)
                .then((response) => response.json())
                .then((data) => setProducts(data))
        }else{
            fetch(`http://localhost:3000/products`)
                .then((response) => response.json())
                .then((data) => setProducts(data))
        }
    }, [props.category]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.length > 0 ? products.slice(indexOfFirstProduct, indexOfLastProduct) : [];
    
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
    const calculateDiscount = (product) => {
        if (!product) {
          return "Produto não encontrado";
        }
      
        let maxDiscount = 0;
      
        if (product.offer !== null) {
          maxDiscount = product.offer;
        }
      
        if (
          product.categories &&
          Array.isArray(product.categories) &&
          product.categories.length > 0
        ) {
          product.categories.forEach((category) => {
            if (category.offer !== null && category.offer.offer > maxDiscount) {
              maxDiscount = category.offer.offer;
            }
          });
        }
      
        if (maxDiscount > 0) {
          const discountedPrice = product.price * (1 - maxDiscount / 100);
          return(
            <div>
            <p>{'R$'+product.price}</p>
            <p>{'R$'+discountedPrice.toFixed(2)}</p>{/* taschener aqui */}
              <p>{maxDiscount+'%'}</p>  
            </div>
          ) 
          
        }
      
        return "Sem desconto";
      };
      
      
      
      

    const handleBuyClick = (productId,index) => {
    
        console.log('Clicou em Comprar'); 
        const imagem=products[index].images[0].id;
        console.log('qtd:', qtd);
        console.log('token:', token);
        sendPurchaseRequest(productId, qtd, token, imagem);
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
                            <Link to={`/product/${product.id}`} className="linkCard">
                            <div className="nameDiv">
                                <h1 className="productName">{product.name}</h1>
                            </div>
                            {product.images && (
                                <Card.Img
                                className="cardImg"
                                src={`http://localhost:3000/uploads/${product.images[0]?.path}`}
                                onError={() => console.log(`Erro ao carregar a imagem: /uploads/${product.images[0]?.path}`)}
                                />
                            )}
                            <div className="cardTexts">
                                <p>{product.brand}</p>
                                <p>{calculateDiscount(product)}</p> 
                            </div>
                            </Link>
                            <button className="buyButton" onClick={() => handleBuyClick(product.id, index)}>
                            Comprar
                            </button>
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