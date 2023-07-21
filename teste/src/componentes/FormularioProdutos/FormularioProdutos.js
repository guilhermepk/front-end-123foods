
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const FormularioProdutos = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    brand: '',
    weight: '',
    unit_of_measurement: '',
    category: '',
    amount: '',
    description: '',
    price: '',
    image: null
  });

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
    sendDataToServer(formValues);
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
    data.weight = parseFloat(data.weight);
    formData.append('weight', data.weight);
    formData.append('unit_of_measurement', data.unit_of_measurement);
    formData.append('category', data.category);
    data.amount = parseInt(data.amount);
    formData.append('amount', data.amount);
    formData.append('description', data.description);
    const price = parseFloat(data.price);
    console.log(typeof(price))
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
    <form onSubmit={handleSubmit}>
    <label>
      Nome do produto:
      <input
        type="text"
        name="name"
        value={formValues.name}
        onChange={handleChange}
        placeholder='Digite o ome que será exibido'
      />
    </label>
    <label>
      Marca:
      <input
        type="text"
        name="brand"
        value={formValues.brand}
        onChange={handleChange}
      />
    </label>
    <label>
      Peso:
      <input
        type="text"
        name="weight"
        value={formValues.weight}
        onChange={handleChange}
      />
    </label>
    <label>
      Unidade de medida (Kg, g, L, ml, etc):
      <input
        type="text"
        name="unit_of_measurement"
        value={formValues.unit_of_measurement}
        onChange={handleChange}
      />
    </label>
    <label>
      Categoria:
      <input
        type="text"
        name="category"
        value={formValues.category}
        onChange={handleChange}
      />
    </label>
    <label>
      Quantidade:
      <input
        type="text"
        name="amount"
        value={formValues.amount}
        onChange={handleChange}
      />
    </label>
    <label>
      Descrição:
      <input
        type="text"
        name="description"
        value={formValues.description}
        onChange={handleChange}
      />
    </label>
    <label>
      Preço:
      <input
        type="text"
        name="price"
        value={formValues.price}
        onChange={handleChange}
      />
    </label>
    <label>
        Imagem:
        <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Arraste a imagem aqui...</p>
          ) : (
            <>
              {formValues.image ? (
                <img src={URL.createObjectURL(formValues.image)} alt="Imagem selecionada" />
              ) : (
                <p>Arraste e solte a imagem aqui ou clique para selecionar</p>
              )}
            </>
          )}
        </div>
      </label>
    <button type="submit">Submit</button>
  </form>
  );
};

export default FormularioProdutos;