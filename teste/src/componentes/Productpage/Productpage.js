import React, { useState, useEffect } from "react";
import './productpage.css'
import { sendPurchaseRequest } from '../Buy/Buy'; 

const Productpage = (props) => {
    const [products, setProducts] = useState([]);
    const [similar, setSimilar] = useState([]);
    const [qtd, setQtd] = useState(1);
    const [token, setToken] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_HOST}/products/${props.productId}`)
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
                console.log('data: ',data);
            });
    }, []);
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
console.log(products)

useEffect(() => {
    console.log('useEffect para produtos similares acionado');
    const storedToken = localStorage.getItem('payload');
    if (storedToken) {
      setToken(storedToken);
    }
    console.log('propsID',props.productId)
      fetch(`${process.env.REACT_APP_HOST}/products/${props.productId}/similar`)
        .then((response) => response.json())
        .then((data) => {
          setSimilar(data);
          console.log('similares', similar);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  , []);
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
                <div className="product-description">{products.description&&
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
                    <div className="product-list">
                        <img className="" src="/imagens/12389.png"></img>
                        <p className="p-product-text">Monster Energy Melancia</p>
                        <div className="button-buy-product">
                        <button className="sla">Comprar</button>
                        </div>
                    </div>
            </div>
        </div>
    );
}

export default Productpage;