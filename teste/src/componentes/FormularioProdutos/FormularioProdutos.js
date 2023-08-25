import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './FormularioProdutos.css';
import { Link } from "react-router-dom";

const FormularioProdutos = () => {
  const initialFormValues = {
    name: '',
    brand: '',
    weight: '',
    unit_of_measurement: '',
    category: '',
    amount: '',
    description: '',
    price: '',
    image: null
  }

  const [formValues, setFormValues] = useState(initialFormValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFileDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFormValues({ ...formValues, image: file });
  }, [formValues]);


  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    formData.append('name', formValues.name);
    formData.append('brand', formValues.brand);
    formData.append('weight', parseFloat(formValues.weight));
    formData.append('unit_of_measurement', formValues.unit_of_measurement);
    formData.append('category', formValues.category);
    formData.append('amount', parseInt(formValues.amount));
    formData.append('description', formValues.description);
    formData.append('price', parseFloat(formValues.price));
    formData.append('file', formValues.image);
  
    fetch('http://localhost:3000/foods', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*'
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFormValues(initialFormValues);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFileDrop,
    accept: 'image/*',
    multiple: false,
  });

  const sendDataToServer = (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('brand', data.brand);

    const weight = parseFloat(data.weight);
    console.log('Enviando', weight, 'como weight, do tipo', typeof(weight))
    formData.append('weight', weight);

    formData.append('unit_of_measurement', data.unit_of_measurement);
    formData.append('category', data.category);

    const amount = parseInt(data.amount)
    console.log('Enviando', amount, 'como amount, do tipo', typeof(amount))
    formData.append('amount', amount);

    formData.append('description', data.description);

    const price = parseFloat(data.price)
    console.log('Enviando', price, 'como price, do tipo', typeof(price))
    formData.append('price', price);

    formData.append('file', data.image);
    
  
    fetch('http://localhost:3000/foods', {
      method: 'POST', 
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <form className="modal-produtos" onSubmit={handleSubmit}>
      <h1 className="cadastro-texto"> Cadastrar produtos </h1>
    <div className="cadastro-produtos1">
    <label className="label-produtos">
      Nome do produto:
      <input
        type="text"
        className="input-produtos1"
        name="name"
        value={formValues.name}
        onChange={handleChange}
        placeholder='Pringles clássico, Suco Kappo de uva, etc.'
      />
    </label>
    <label className="label-produtos">
      Marca:
      <input
        type="text"
        className="input-produtos2"
        name="brand"
        value={formValues.brand}
        onChange={handleChange}
        placeholder='Nenhuma, Pringles, Kappo, ElmaChips, etc.'
      />
    </label>
    <label className="label-produtos">
      Peso:
      <input
        type="number"
        className="input-produtos3"
        name="weight"
        value={formValues.weight}
        onChange={handleChange}
        placeholder='5, 240, 500, 1, etc.'
      />
    </label>
    </div>
    <div className="cadastro-produtos2">
    <label className="label-produtos">
      Unidade de medida:
      <input
        type="text"
        className="input-produtos4"
        name="unit_of_measurement"
        value={formValues.unit_of_measurement}
        onChange={handleChange}
        placeholder='Kg, g, L, ml'
      />
    </label>
    <label className="label-produtos">
      Categoria:
      <input
        type="text"
        className="input-produtos5"
        name="category"
        value={formValues.category}
        onChange={handleChange}
        placeholder='Salgados, Doces, Frios, Leites e derivados, etc.'
      />
    </label>
    <label className="label-produtos">
      Quantidade em estoque:
      <input
        type="number"
        className="input-produtos6"
        name="amount"
        value={formValues.amount}
        onChange={handleChange}
        placeholder='5, 7, 13, 20, etc.'
      />
    </label>
    </div>
    <label className="label-produtos">
      Descrição:
      <textarea
        type="text"
        className="input-produtos"
        name="description"
        value={formValues.description}
        onChange={handleChange}
        placeholder='Batata chips Pringles sabor Churrasco'
        rows={3}
        style={{ resize: 'none' }}
      />
    </label>
    <label className="label-produtos">
      Preço:
      <input
        type="number"
        className="input-produtos"
        name="price"
        value={formValues.price}
        onChange={handleChange}
        placeholder='14,99; 26,37; 49,99; etc.'
      />
    </label>
    {/* <li>
    <div className="imagem-modal">
    <label className="label-produtos">
      Imagens:
      <div {...getRootProps()} className={`dropzone-produtos ${isDragActive ? 'active' : ''}`}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Arraste a imagem aqui...</p>
        ) : (
          <>
            {formValues.image ? (
              <img src={URL.createObjectURL(formValues.image)} alt="Imagem selecionada" />
            ) : (
              <p className="imagem-banner-click">Arraste e solte a imagem aqui ou clique para selecionar</p>
            )}
          </>
        )}
      </div>
    </label>
    <button  className="botao-banner-salvar" type="submit"> Enviar </button>
    </div>
    </li> */}
  </form>
  );
};

export default FormularioProdutos;