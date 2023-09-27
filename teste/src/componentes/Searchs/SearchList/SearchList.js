import "./SearchList.css";

import { useEffect, useState } from "react";
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

const SearchList = (props) => {
    const searchValue = props.searchValue;
    const [products, setProducts] = useState();

    
    useEffect(() => {
        if (searchValue.trim().length > 0) {
            fetch(`${process.env.REACT_APP_HOST}/products/search?filterValue=${encodeURIComponent(searchValue)}`)
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => {
                console.error('Erro ao buscar alimentos:', error);
            });
        }
    }, []);

    return(
        <div className="search-div-list">
        <ul className="search-card-list">
            {products && products.length > 0 && products.map((product, index) => (
                <Col key={index} className="search-card-col">
                    <Card className="search-card-product">
                        <a href={`/product/${product.id}`} className="search-link-card">

                            <h1 className="search-product-name">{product.name}</h1>

                            {product.images && (
                                <Card.Img className="search-card-img"
                                    src={`${process.env.REACT_APP_HOST}/uploads/${product.images[0]?.path}`}
                                    //onLoad={() => console.log(`Imagem carregada: /uploads/${product.images[0]?.path}`)}
                                    onError={() => console.log(`Erro ao carregar a imagem: /uploads/${product.images[0]?.path}`)}
                                />
                            )}
                            

                            <div className="search-card-texts">
                                <p>{product.brand}</p>
                                <p>R$ {product.price}</p>
                            
                            </div>

                        </a> 

                    </Card>
                </Col>
            ))}
            {products && products.length === 0 && (
                <p>Nenhum produto encontrado</p>
            )}
        </ul>
        </div>
    );
}

export default SearchList;