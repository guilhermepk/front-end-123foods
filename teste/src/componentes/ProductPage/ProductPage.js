import React, { useState, useEffect } from "react";

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
            Produto: {product.name}
        </div>
    );
}

export default ProductPage;