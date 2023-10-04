import './SearchModal.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { setValue } from '../Search/Search';

const SearchModal = (props) => {
    const [products, setProducts] = useState([]);
    
    const navigate = useNavigate();
    const setSearchValue = setValue;

    useEffect(() => {
        if (props.value?.trim().length > 0) {
            fetch(`${process.env.REACT_APP_HOST}/products/search?filterValue=${encodeURIComponent(props.value)}`)
                .then((response) => response.json())
                .then((data) => {
                    setProducts(data);
                })
                .catch((error) => {
                    console.error('Erro ao buscar alimentos:', error);
                });
        } else {
            setProducts([]);
        }
    }, [props.value]);

    // Função para destacar o texto de correspondência na sugestão
    const highlightMatch = (suggestion, query) => {
        const index = suggestion?.toLowerCase().indexOf(query?.toLowerCase());
        if (index !== -1) {
            return (
                <>
                    {suggestion?.substring(0, index)}
                    <span className="highlight">{suggestion?.substring(index, index + query?.length)}</span>
                    {suggestion?.substring(index + query?.length)}
                </>
            );
        }
        return suggestion;
    };

    return (
        <>{products.length > 0 && (
            <div className='autocomplete-results'>
                {products.slice(0, 10).map((product, index) => (
                    <Link key={index} 
                    to={`/product/${product.id}`}
                    className={`suggestion-link ${index === props.selected ? 'selected' : ''}`}>    
                    
                        <p>
                            {highlightMatch(product.name, props.value)}
                        </p>
                    </Link>
                ))}
            </div>
        )}</>
    );
}

export default SearchModal;