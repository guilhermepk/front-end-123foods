import React, { useState, useEffect } from "react";
import './productpage.css'
const Productpage = (props) => {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/foods/${props.productId}`)
            .then((response) => response.json())
            .then((data) => {
                setProduct(data);
                console.log('data: ',data);
            });
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
                <button className="botao-menos">-</button>
                <p>Qtd</p>
                <button className="botao-mais">+</button>
                <button className="botao-comprar" type="submit">Comprar</button>
            </div>
            </div>
        </div>
    );
}

export default Productpage;