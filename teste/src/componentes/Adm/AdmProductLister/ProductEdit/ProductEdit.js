import React, { useState, useCallback, useEffect } from 'react';
import Select from 'react-select'
import { useDropzone } from 'react-dropzone';

const ProductEdit = (props) => {
    const [product, setProduct] = useState(null);

    let initialFormValues;
    let [formValues, setFormValues] = useState(null);
    if (product && !initialFormValues){
        const categories = []
        product.categories.map((category) => {
            categories.push(category.id)
        })
        initialFormValues = {
            id: product.id,
            image: null,
            name: product.name,
            brand: product.brand,
            price: product.price,
            description: product.description,
            categories: [...categories],
            amount: product.amount
        }
        if (!formValues) setFormValues(initialFormValues);
    }

    useEffect(() => {
        fetch(`http://localhost:3000/products/${props.productId}`)
            .then((response) => response.json())
            .then((data) => {
                setProduct(data);
            });
    }, [props.productId]);


    const handleFileDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        setFormValues({ ...formValues, image: file });
    }, [formValues]);
    
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleFileDrop,
        accept: 'image/*',
        multiple: false,
      });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
      };

    const handleSubmit = (e) => {
        
    }

    const [categoriesAvailable,setcategoriesAvailable] = useState([]);
    useEffect(() => {
            fetch(`http://localhost:3000/categories`)
            .then((response) => response.json())
            .then((data) => {
                setcategoriesAvailable(data);
            });
    }, []);

    return (
        <>
        {formValues && (
            <form onSubmit={handleSubmit}>
                <label className="label-produtos">
                    ID: {product.id}
                </label>

                <label className="label-imagem">
                    Imagem:
                </label>
                <div {...getRootProps()} className="imagem-banner-click">
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p>Arraste a imagem aqui...</p>
                    ) : (
                        <>
                            {formValues.image ? (
                                <img src={URL.createObjectURL(formValues.image)} className="img-produto" alt="Imagem selecionada" />
                            ) : (
                                <p className="teste">Arraste a imagem aqui</p>
                            )}
                        </>
                    )}
                </div>

                <label className="label-produtos">
                    Nome:
                    <input
                        type='text'
                        value={formValues.name}
                        onChange={handleChange}
                    />
                </label>

                <label className="label-produtos">
                    Marca:
                    <input
                        type="text"
                        value={formValues.brand}
                        onChange={handleChange}
                    />
                </label>

                <label className="label-produtos">
                    Preço:
                    <input
                        type="number"
                        name="price"
                        value={formValues.price}
                        onChange={handleChange}
                        placeholder='Inserir preço'
                    />
                </label>

                <label className="label-produtos">
                Descrição:
                    <textarea
                        type="text"
                        value={formValues.description}
                        onChange={handleChange}
                        rows={3}
                        style={{ resize: 'none' }}
                    />
                </label>

                <label className="label-produtos">
                    Categoria:
                    <Select
                        value = {formValues.categories && formValues.categories.map((id) => ({
                            value: id,
                            label: categoriesAvailable.find((cat) => cat.id === id)?.name || '',
                        }))}
                        isMulti
                        options={categoriesAvailable && categoriesAvailable.map((cat) => ({
                            value: cat.id,
                            label: cat.name,
                        }))}
                        onChange={(selectedOptions) => {
                            const selectedCategoryId = selectedOptions.map((option) => option.value);
                            setFormValues({ ...formValues, categories: selectedCategoryId });
                            console.log("categoryId:", selectedCategoryId);
                        }}
                    />
                </label>

                <label className="label-produtos">
                    Quantidade em estoque:
                    <input
                        type="number"
                        value={formValues.amount}
                        onChange={handleChange}
                    />
                </label>
            </form>
        )}
        </>
    );
}

export default ProductEdit;