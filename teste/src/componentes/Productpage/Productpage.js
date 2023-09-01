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
        <div>
            <div className="product">
                <div>{product.name && 
                    <h2 className="product-name">{product.name}</h2>}
                </div>
                <div>{product.images && product.images.length > 0 && (
                    <img className="product-image" src={`http://localhost:3000/uploads/${product.images[0]?.path}`} alt="Imagem do Produto" />
                    )}     
                </div>
                <div className="product-description">{product.description&&
                    <p>{product.description}</p>
                    }
                </div>
            <div>
                <button onClick={handleDecreaseClick}>-</button>
                <p>Qtd: {qtd}</p>
                <button onClick={handleIncreaseClick}>+</button>
                <button type="submit" onClick={handleBuyClick}>Comprar</button>
            </div>
            </div>
        </div>
    );
}

export default Productpage;