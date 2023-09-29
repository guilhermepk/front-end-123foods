import React, { useState, useEffect } from "react";
import './productpage.css'
import { sendPurchaseRequest } from '../Buy/Buy'; 
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Productpage = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(15);
    const [products, setProducts] = useState([]);
    const [similar, setSimilar] = useState([]);
    const [qtd, setQtd] = useState(1);
    const [token, setToken] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_HOST}/products/${props.productId}`)
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
                console.log('data: ', data);
            });

        const storedToken = localStorage.getItem('payload');
        if (storedToken) {
            setToken(storedToken);
        }

        fetch(`${process.env.REACT_APP_HOST}/products/similar/${props.productId}`)
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    setSimilar(data.slice(0, data.length));
                    console.log('data similar: ', data);
                } else {
                    console.log('data similar está vazio');
                }
            })
            .catch((error) => {
                console.error('Erro ao buscar dados similares:', error);
            });
    }, [props.productId]);

    const handleDecreaseClick = () => {
        if (qtd > 1) {
            setQtd(qtd - 1);
        }
    };

    const handleIncreaseClick = () => {
        setQtd(qtd + 1);
    };

    const handleBuyClick = () => {
        console.log('Clicou em Comprar'); 
        console.log('productId:', props.productId);
        console.log('qtd:', qtd);
        const imagem = products.images[0].id;
        console.log('token:', token);
        sendPurchaseRequest(props.productId, qtd, token, imagem);
    };
    
    const productTemplate = (similar) => {
        return (
            <div className="card-list">
                <div className="product-list">
                    <div>
                        <Link to={`/product/${similar.productId}`} className="linkCard">
                            <div className="mb-3">
                                    <Card.Img
                                        className="cardImg"
                                        src={`${process.env.REACT_APP_HOST}/uploads/${similar.path}`}
                                        
                                        alt={`Imagem do produto ${similar.name}`}
                                        onError={() => console.log(`Erro ao carregar a imagem: /uploads/${similar.path}`)}
                                    />
                            </div>
                            <div>
                                <h4 className="mb-1">{similar.name}</h4>
                                <h6 className="mb-1">R${similar.price}</h6>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        );
    };

    const settings = {
        dots: true,
        arrows:true,
        infinite: true,
        vertical: true,
        verticalSwiping: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        onWheel: (event) => event.preventDefault(),
    
    };

    return (
        <div className="product-move">
            <div className="product">
                <div className="product-itens">
                    {products.name && 
                    <h2 className="product-name">{products.name}</h2>}
                    <div className="product-align">
                    {products.images && products.images.length > 0 && (
                    <img className="product-image" src={`${process.env.REACT_APP_HOST}/uploads/${products.images[0]?.path}`} alt="Imagem do Produto" />
                    )}
                    </div>     
                </div>
                <div className="product-description">{products.description &&
                    <p>{products.description}</p>
                    }
                </div>
                <div className="button-product">
                <button className="button-qtd1" onClick={handleDecreaseClick}>-</button>
                <p className="button-qtd2">Qtd: {qtd}</p>
                <button className="button-qtd3" onClick={handleIncreaseClick}>+</button>
                <button className="button-comprar" type="submit" onClick={handleBuyClick}>Comprar</button> 
                </div>
            </div>
            <div className="product-carrousel">
                <div className="product-text">
                    <p>Itens Relacionados</p>
                </div>
                <div className="carousel">
                {similar.length > 0 ? (
                    <Slider {...settings}>
                    {similar.map((item, index) => (
                        <div key={index} className={`carousel-item`}>
                        {productTemplate(item)}
                        </div>
                    ))}
                    </Slider>
                ) : (
                    <p>Nenhum produto relacionado</p>
                )}
                </div>
            </div>
        </div>
    );
}

export default Productpage;