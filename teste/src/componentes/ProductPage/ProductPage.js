import React, { useState, useEffect } from "react";
import './productPage.css'
const ProductPage = (props) => {
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
        <div className="Product">
        <div>{product.name && <h2 className="Product-name">{product.name}</h2>}</div>
        <div>{product.images && product.images.length > 0 && (
            <img className="Product-image" src={`http://localhost:3000/uploads/${product.images[0]?.path}`} alt="Imagem do Produto" />
        )}  </div>
        <div className="Product-description">{product.description&& <p >{product.description}
        </p>}</div>
        <div>
        <button>-</button>
        <p>Qtd</p>
        <button>+</button>
            <button type="submit">Comprar</button>
        </div>
        
        </div>
        
    </div>
    );
}

export default ProductPage;