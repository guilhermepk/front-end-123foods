import React, { useState, useCallback,useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import './Productform.css';
import Select from 'react-select';
import axios from 'axios';

const Productform= (props) => {
  const [initialFormValues, setInitialFormValues] = useState({});
  const [product, setProduct] = useState(null);
  
  useEffect(() => {
    if(props.productId){
      fetch(`http://localhost:3000/products/${props.productId}`)
        .then((response) => response.json())
        .then((data) => {
          setProduct(data);
          setInitialFormValues({
            name: data.name,
            brand: data.brand,
            weight: data.weight,
            unitsofmeasurementId: data.units_of_measurements.id,
            categoriesIds: data.categories.map(category => category.id),
            amount: data.amount,
            description: data.description,
            price: data.price,
            image: null
          })
        });
        
    }else{
      setInitialFormValues({
        name: '',
        brand: '',
        weight: '',
        unitsofmeasurementId: '',
        categoriesIds: '',
        amount: '',
        description: '',
        price: '',
        image: null
      })
    }
  }, []);
  
  const [measurement,setmeasurement] = useState([]);
  const [category,setcategory] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/unitsofmeasurement`)
        .then((response) => response.json())
        .then((data) => {
            setmeasurement(data);
        });
        fetch(`http://localhost:3000/categories`)
        .then((response) => response.json())
        .then((data) => {
            setcategory(data);
        });
}, []);

  const [formValues, setFormValues] = useState({});
  useEffect(() => {
    setFormValues(initialFormValues)
  }, [initialFormValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFileDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFormValues({ ...formValues, image: file });
  }, [formValues]);
  

  const handleUpdate = async () => {
    const updatedData = new FormData();
      
    updatedData.append('name', formValues.name);
    updatedData.append('brand', formValues.brand);
    updatedData.append('weight', parseFloat(formValues.weight));
    updatedData.append('unitsofmeasurementId', parseInt(formValues.unitsofmeasurementId));
    
    if (formValues.categoriesIds.length > 1) {
      formValues.categoriesIds.forEach((id) => {
        updatedData.append('categoriesIds', parseInt(id));
      });
    } else {
      updatedData.append('categoriesIds[]', [parseInt(formValues.categoriesIds)]);
    }
  
    updatedData.append('amount', parseInt(formValues.amount));
    updatedData.append('description', formValues.description);
    updatedData.append('price', parseFloat(formValues.price));

    try{
      updatedData.append('file', formValues.image);
    }catch(e){
      console.error("deu erro enviando a imagem:", e);
    }

    try {
      const response = await axios.patch(`http://localhost:3000/products/${props.productId}`, updatedData);
      console.log('Dados atualizados com sucesso!', response.data);
    } catch (error) {
      console.error('Erro ao atualizar dados:', error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (props.productId){
      handleUpdate();
    }else{
      const formData = new FormData();
      
      formData.append('name', formValues.name);
      formData.append('brand', formValues.brand);
      formData.append('weight', parseFloat(formValues.weight));
      formData.append('unitsofmeasurementId', parseInt(formValues.unitsofmeasurementId));
      
      if (formValues.categoriesIds.length > 1) {
        formValues.categoriesIds.forEach((id) => {
          formData.append('categoriesIds', parseInt(id));
        });
      } else {
        formData.append('categoriesIds[]', [parseInt(formValues.categoriesIds)]);
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
    }
  };
  
 
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFileDrop,
    accept: 'image/*',
    multiple: false,
  });

  return (
    <form className="modal-produtos" onSubmit={handleSubmit}>
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
              
            }
          }}
        />
      </label>

    <label className="label-produtos">
      Categoria:
      <Select
    className="input-produtos1"
    value={formValues.categoriesIds && formValues.categoriesIds.map((id) => ({
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
      setFormValues({ ...formValues, categoriesIds: selectedCategoryId });
      
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
        step='0.01'
        placeholder='Inserir preço'
      />
    </label>
    </div>

    <div className='div-img-button'>
    
      {product && (
        <div>
          <h3> Imagem atual: </h3>
          {product && (
            <img src={`http://localhost:3000/uploads/${product.images[0].path}`}/>
          )}
        </div>
      )}

      <div>
        <label className="label-imagem-dropzone">
          Imagem:
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
                <p className="text-dropzone">
                  <div className='text-dropzone-div'> Arraste a imagem aqui </div>
                  <div className='text-dropzone-div'>
                    {product && (<span> Deixe vazio para manter a imagem atual </span>)}
                  </div>
                </p>
              )}
            </>
          )}
        </div>
        <div className="div-button-banner">
        <button  className="botao-banner-salvar" type="submit"> Enviar </button>
        </div>
      </div>
    </div>
  </form>
  );
};

export default Productform;