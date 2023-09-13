import React, { useState, useCallback,useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import './Productform.css';
import { Link } from "react-router-dom";
// import { useForm } from "react-hook-form";
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
  const [measurement,setmeasurement]=useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/unitsofmeasurement`)
        .then((response) => response.json())
        .then((data) => {
            setmeasurement(data);
            console.log('data: ',data);
        });
}, []);



  // http://localhost:3000/unitsofmeasurement

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
    formData.append('unitsofmeasurementId',parseInt(formValues.unitsofmeasurementId) );

    formData.append('category', formValues.category);
    formData.append('amount', parseInt(formValues.amount));
    formData.append('description', formValues.description);
    formData.append('price', parseFloat(formValues.price));
    formData.append('file', formValues.image);
  
    fetch('http://localhost:3000/products', {
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
        window.location.href = ' /admin/product-list';
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

  
  // const { setValue } = useForm();
  return (
    <form className="modal-produtos" onSubmit={handleSubmit}>
      <div>
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
        placeholder='Inserir produtos'
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
        placeholder='Inserir marca'
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
        placeholder='Inserir peso'
      />
    </label>
    </div>
    <div className="cadastro-produtos2">
    <label className="label-produtos">
      Unidade de medida:
      <div>
      <select
              value={formValues.unitsofmeasurementId}
              onChange={(e) => {
                const selectedMeasurementId = e.target.value;
                setFormValues({ ...formValues, unitsofmeasurementId: selectedMeasurementId });
                console.log("unitsofmeasurementId:", selectedMeasurementId);
              }}
            >
              {measurement.map((measurement) => (
                <option key={measurement.id} value={measurement.id}>
                  {measurement.name}
                </option>
              ))}
      </select>

    </div>
    </label>
    <label className="label-produtos">
      Categoria:
      <input
        type="text"
        className="input-produtos5"
        name="category"
        value={formValues.category}
        onChange={handleChange}
        placeholder='Inserir categoria'
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
        placeholder='Inserir quantidade'
      />
    </label>
    </div>
    <div className="cadastro-produtos3">
    <label className="label-produtos">
      Descrição:
      <textarea
        type="text"
        className="input-produtos7"
        name="description"
        value={formValues.description}
        onChange={handleChange}
        placeholder='Inserir descrição'
        rows={3}
        style={{ resize: 'none' }}
      />
    </label>
    <label className="label-produtos">
      Preço:
      <input
        type="number"
        className="input-produtos8"
        name="price"
        value={formValues.price}
        onChange={handleChange}
        placeholder='Inserir preço'
      />
    </label>
    </div>
    <label className="label-imagem">
      Imagens:
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
    <button  className="botao-banner-salvar" type="submit"> Enviar </button>
    </div>
  </form>
  );
};

export default Productform;