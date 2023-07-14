const Cart = ({ cart, removeFromCart }) => {
    return (
      <div>
        <h2>Carrinho de Compras</h2>
        {cart.map((item) => (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.price}</p>
            <button onClick={() => removeFromCart(item)}>Remover do carrinho</button>
          </div>
        ))}
      </div>
    );
  };

export default Cart;