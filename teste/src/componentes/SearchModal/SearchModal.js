import { useEffect, useState } from 'react';
import './SearchModal.css';

const SearchModal = (props) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (props.value.trim().length > 0) {
            fetch(`http://localhost:3000/foods/search?filterValue=${encodeURIComponent(props.value)}`)
                .then((response) => response.json())
                .then((data) => {
                    setProducts(data);
                })
                .catch((error) => {
                    console.error('Erro ao buscar alimentos:', error);
                });
        } else if (props.value.trim().length === 0) {
            setProducts([]);
        }
    }, [props.value]);

    const lista = [
        'a',
        'b',
        'c'
    ]

    return (
        <div className='autocomplete-results'>
            {products.map((product) => (
                <div>
                    <p>{product.name}</p>
                </div>
            ))}
        </div>
    );
}

export default SearchModal;
