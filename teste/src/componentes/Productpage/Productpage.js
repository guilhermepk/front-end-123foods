import React, { useState, useEffect } from "react";
import './productpage.css'
import { sendPurchaseRequest } from '../Buy/Buy'; 

const Productpage = (props) => {
    const [product, setProduct] = useState([]);
    const [qtd, setQtd] = useState(1);
    const [token, setToken] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/foods/${props.productId}`)
            .then((response) => response.json())
            .then((data) => {
                setProduct(data);
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
  console.log('token:', token);
  sendPurchaseRequest(props.productId, qtd, token);
    };


  useEffect(() => {
    const storedToken = localStorage.getItem('payload');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
    return (
        <div className="product-move">
            <div className="product">
                <div className="product-itens">
                    {product.name && 
                    <h2 className="product-name">{product.name}</h2>}
                    <div className="product-align">
                    {product.images && product.images.length > 0 && (
                    <img className="product-image" src={`http://localhost:3000/uploads/${product.images[0]?.path}`} alt="Imagem do Produto" />
                    )}
                    </div>     
                </div>
                <div className="product-description">{product.description&&
                    <p>{product.description}</p>
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