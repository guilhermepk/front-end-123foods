import './Product.css';

const Product =({product, addToCart}) =>{
    return(
        <div>
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <button onClick={() => addToCart(product)}>Adicionar ao carrinho</button>
        </div>
    );
};

export default Product;