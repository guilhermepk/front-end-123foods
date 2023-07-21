
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
    images: []
  });

  const handleImageChange = (e) => {
    const images = Array.from(e.target.files);
    setFormValues({ ...formValues, images });
  };

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
  
    // for (const image of formValues.images) {
    //   formData.append('files', image);
    // }


  
    fetch('http://localhost:3000/foods', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   sendDataToServer(formValues);
  // };
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

    formData.append('files', data.images);
    
  
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
        type="number"
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
        type="number"
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
        type="number"
        name="price"
        value={formValues.price}
        onChange={handleChange}
      />
    </label>

    {/* ENVIO DE IMAGEM */}
    {/* <label>
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
    </label> */}

    <label>
      Imagens:
      <div>
        <input type="file" accept="image/*" multiple onChange={handleImageChange} />
        {formValues.images.length > 0 ? (
          <div>
            {formValues.images.map((image) => (
              <img key={image.name} src={URL.createObjectURL(image)} alt="Imagem selecionada" />
            ))}
          </div>
        ) : (
          <p>Arraste e solte as imagens aqui ou clique para selecionar</p>
        )}
      </div>
    </label>

    <button type="submit"> Enviar </button>
  </form>
  );
};

export default FormularioProdutos;