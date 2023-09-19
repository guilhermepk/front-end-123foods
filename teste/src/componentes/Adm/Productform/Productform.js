import React, { useState, useCallback,useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import './Productform.css';
import Select from 'react-select'
const Productform= () => {
  const initialFormValues = {
    name: '',
    brand: '',
    weight: '',
    unitsofmeasurementId: '',
    category: '',
    amount: '',
    description: '',
    price: '',
    
    image: null
  }
  const [measurement,setmeasurement] = useState([]);
  const [category,setcategory] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/unitsofmeasurement`)
        .then((response) => response.json())
        .then((data) => {
            setmeasurement(data);
            console.log('data: ',data);
        });
        fetch(`http://localhost:3000/categories`)
        .then((response) => response.json())
        .then((data) => {
            setcategory(data);
            console.log('data: ',data);
        });
}, []);



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
    formData.append('unitsofmeasurementId', parseInt(formValues.unitsofmeasurementId));
    
    if (formValues.categoryId.length > 1) {
      formValues.categoryId.forEach((id) => {
        formData.append('categoryIds', parseInt(id));
      });
    } else {
      formData.append('categoryIds[]', [parseInt(formValues.categoryId)]);
    }
  
    formData.append('amount', parseInt(formValues.amount));
    formData.append('description', formValues.description);
    formData.append('price', parseFloat(formValues.price));
    formData.append('file', formValues.image);
  
    try {
      fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, application/xml, text/plain, text/html, *.*'
        },
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erro na solicitação HTTP: ' + response.status);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setFormValues(initialFormValues);
          window.location.href = '/admin/product-list';
        })
        .catch((error) => {
          console.error('Erro durante o processamento da solicitação:', error);
        });
    } catch (error) {
      console.error('Erro durante o envio da solicitação:', error);
    }
  };
  
 
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFileDrop,
    accept: 'image/*',
    multiple: false,
  });

  return (
    <form className="modal-produtos" onSubmit={handleSubmit}>
    <h1 className="cadastro-texto"> Cadastrar produtos </h1>
    <div className="cadastro-produtos">
    <label className="label-produtos">
      Nome do produto:
      <input
        type="text"
        className="input-produtos"
        name="name"
        value={formValues.name}
        onChange={handleChange}
        placeholder='Inserir produtos'
      />
    </label>
    <label className="label-produtos">
      Marca:
      <input
        type="text"
        className="input-produtos"
        name="brand"
        value={formValues.brand}
        onChange={handleChange}
        placeholder='Inserir marca'
      />
    </label>
    <label className="label-produtos">
      Peso:
      <input
        type="number"
        className="input-produtos"
        name="weight"
        value={formValues.weight}
        onChange={handleChange}
        placeholder='Inserir peso'
      />
    </label>
    <label className="label-produtos">
        Unidade de medida:
        <Select
          className="input-produtos1"
          value={measurement.map((m) => (
            m.id === formValues.unitsofmeasurementId && {value: m.id, label: m.name}
          ))}
          options={measurement.map((m) => ({
            value: m.id,
            label: m.name,
          }))}
          onChange={(selectedOption) => {
            if (selectedOption) {
              const selectedMeasurementId = selectedOption.value;
              setFormValues({ ...formValues, unitsofmeasurementId: selectedMeasurementId });
              console.log('um', formValues.unitsofmeasurementId)
            }
          }}
        />
      </label>

    <label className="label-produtos">
      Categoria:
      <Select
    className="input-produtos1"
    value={formValues.categoryId && formValues.categoryId.map((id) => ({
      value: id,
      label: category.find((cat) => cat.id === id)?.name || '',
    }))}
    isMulti
    options={category && category.map((cat) => ({
      value: cat.id,
      label: cat.name,
    }))}
    onChange={(selectedOptions) => {
      const selectedCategoryId = selectedOptions.map((option) => option.value);
      setFormValues({ ...formValues, categoryId: selectedCategoryId });
      console.log("categoryId:", selectedCategoryId);
    }}
  />
    </label>
    <label className="label-produtos">
      Quantidade em estoque:
      <input
        type="number"
        className="input-produtos"
        name="amount"
        value={formValues.amount}
        onChange={handleChange}
        placeholder='Inserir quantidade'
      />
    </label>
    <label className="label-produtos">
      Descrição:
      <textarea
        type="text"
        style={{ resize: 'vertical' }}
        className="input-produtos"
        name="description"
        value={formValues.description}
        onChange={handleChange}
        placeholder='Inserir descrição'
        rows={3}
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
        placeholder='Inserir preço'
      />
    </label>
    </div>
    <div className='div-img-button'>
    
    <label className="label-imagem-dropzone">
      Imagens:
      </label>
      <div {...getRootProps()} className="imagem-banner-click">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Arraste a imagem aqui...</p>
        ) : (
          <>
            {formValues.image ? (
              <div className='div-img-move'>
              <img src={URL.createObjectURL(formValues.image)} className="img-produto" alt="Imagem selecionada" />
              </div> 
            ) : (
              <p className="text-dropzone">Arraste a imagem aqui</p>
            )}
          </>
        )}
      </div>
      <div className="div-button-banner">
    <button  className="botao-banner-salvar" type="submit"> Enviar </button>
    </div>
    </div>
    </form>
  );
};

export default Productform;