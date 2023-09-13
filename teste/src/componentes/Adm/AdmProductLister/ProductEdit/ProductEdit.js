import { useEffect, useState } from "react";

const ProductEdit = (props) => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/products/${props.productId}`)
            .then((response) => response.json())
            .then((data) => {
                setProduct(data);
                console.log(data);
            });
    }, [props.productId]);

    return(
        <div>
            
        </div>
    );
}

export default ProductEdit;