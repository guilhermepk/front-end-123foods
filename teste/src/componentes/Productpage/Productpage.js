import React, { useState, useEffect } from "react";
import './productpage.css'
import { sendPurchaseRequest } from '../Buy/Buy'; 
import { Carousel } from 'primereact/carousel';
        
const Productpage = (props) => {
    const [products, setProducts] = useState([]);
    const[similars,setSimilars]=useState([])
    const [qtd, setQtd] = useState(1);
    const [token, setToken] = useState(null);
    const [categoryIds, setCategoryIds] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3000/products/${props.productId}`)
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


    useEffect(() => {
        const storedToken = localStorage.getItem('payload');
        if (storedToken) {
          setToken(storedToken);
        }
    chamasimilar()
      }, []);

    const chamasimilar=()=>{
        console.log("produto entrando na categories",products)
      if (products.categories && products.categories.length > 0) {
          const categoryIds = products.categories.map(category => category.id);
          setCategoryIds(categoryIds); // Adicione parênteses aqui
          console.log('IDs das categorias:', categoryIds);
        } else {
          console.log('Não há categorias disponíveis.');
        }
        
        console.log('categorias ID', categoryIds);
      fetch(`http://localhost:3000/products/${props.productId}?categoryIds=${categoryIds.join(',')}`)
        .then((response) => response.json())
        .then((data) => {
          console.log('teste',data)
          setSimilars(data);
          console.log('data: ', data);
        });
        console.log("categorias similares",categoryIds)
        console.log(" similares",similars)
    }
      
  
    return (
        <div className="product-move">
            <div className="product">
                <div className="product-itens">
                    {products.name && 
                    <h2 className="product-name">{products.name}</h2>}
                    <div className="product-align">
                    {products.images && products.images.length > 0 && (
                    <img className="product-image" src={`http://localhost:3000/uploads/${products.images[0]?.path}`} alt="Imagem do Produto" />
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
                        <Carousel value={products} 
                        numVisible={3} 
                        numScroll={1}     
                        orientation="vertical" 
                        verticalViewPortHeight="360px" 
                         />
                        <div className="button-buy-product">
                        <button className="sla">Comprar</button>
                        </div>
                    </div>
            </div>
        </div>
    );
}

export default Productpage;