import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import NavbarAdm from '../navbaradm/navbaradm';

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
    <div>
    <NavbarAdm/>
    <form onSubmit={handleSubmit}>
    <label>
      Nome do produto:
      <input
        type="text"
        name="name"
        value={formValues.name}
        onChange={handleChange}
        placeholder='Pringles clássico, Suco Kappo de uva, etc.'
      />
    </label>
    <label>
      Marca:
      <input
        type="text"
        name="brand"
        value={formValues.brand}
        onChange={handleChange}
        placeholder='Nenhuma, Pringles, Kappo, ElmaChips, etc.'
      />
    </label>
    <label>
      Peso:
      <input
        type="number"
        name="weight"
        value={formValues.weight}
        onChange={handleChange}
        placeholder='5, 240, 500, 1, etc.'
      />
    </label>
    <label>
      Unidade de medida:
      <input
        type="text"
        name="unit_of_measurement"
        value={formValues.unit_of_measurement}
        onChange={handleChange}
        placeholder='Kg, g, L, ml'
      />
    </label>
    <label>
      Categoria:
      <input
        type="text"
        name="category"
        value={formValues.category}
        onChange={handleChange}
        placeholder='Salgados, Doces, Frios, Leites e derivados, etc.'
      />
    </label>
    <label>
      Quantidade em estoque:
      <input
        type="number"
        name="amount"
        value={formValues.amount}
        onChange={handleChange}
        placeholder='5, 7, 13, 20, etc.'
      />
    </label>
    <label>
      Descrição:
      <textarea
        type="text"
        name="description"
        value={formValues.description}
        onChange={handleChange}
        placeholder='Batata chips Pringles sabor Churrasco'
        rows={3}
        style={{ resize: 'none' }}
      />
    </label>
    <label>
      Preço:
      <input
        type="number"
        name="price"
        value={formValues.price}
        onChange={handleChange}
        placeholder='14,99; 26,37; 49,99; etc.'
      />
    </label>

    <label>
      Imagens:
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

    <button type="submit"> Enviar </button>
  </form>
 </div> );
};

export default FormularioProdutos;