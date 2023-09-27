import React, { useState, useCallback,useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import './Productform.css';
import Select from 'react-select';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Productform= (props) => {
  const [initialFormValues, setInitialFormValues] = useState({});
  const [product, setProduct] = useState(null);

  const navigate = useNavigate();
  
  useEffect(() => {
    if(props.productId){
      fetch(`${process.env.REACT_APP_HOST}/products/${props.productId}`)
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
            file: null
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
        file: null
      })
    }
  }, []);
  
  const [measurement,setmeasurement] = useState([]);
  const [category,setcategory] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_HOST}/unitsofmeasurement`)
        .then((response) => response.json())
        .then((data) => {
            setmeasurement(data);
        });
        fetch(`${process.env.REACT_APP_HOST}/categories`)
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
    setFormValues({ ...formValues, file: file });
  }, [formValues]);
  
  const handleCreate = () => {
    const formData = new FormData();
      
      formData.append('name', formValues.name);
      formData.append('brand', formValues.brand);
      formData.append('weight', parseFloat(formValues.weight));
      formData.append('unitsofmeasurementId', parseInt(formValues.unitsofmeasurementId));
      
      if (formValues.categoriesIds.length > 1) {
        formValues.categoriesIds.forEach((id) => {
          console.log('adicionando id categoria', id)
          formData.append('categoriesIds', parseInt(id));
        });
      } else if (formValues.categoriesIds.length == 1){
        console.log('adicionando id ', formValues.categoriesIds);
        formData.append('categoriesIds[]', [parseInt(formValues.categoriesIds)]);
      }else{
        Swal.fire('Ops...', 'O produto deve ter ao menos 1 categoria', 'error');
      }
    
      formData.append('amount', parseInt(formValues.amount));
      formData.append('description', formValues.description);
      formData.append('price', parseFloat(formValues.price));
      formData.append('file', formValues.file);

      try {
        fetch(`${process.env.REACT_APP_HOST}/products`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*'
          },
          body: formData,
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Erro na solicitação HTTP: ${response.status}`);
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

  const handleUpdate = async () => {
    const updatedData = new FormData();
      
    updatedData.append('name', formValues.name);
    updatedData.append('brand', formValues.brand);
    updatedData.append('weight', parseFloat(formValues.weight));
    updatedData.append('unitsofmeasurementId', parseInt(formValues.unitsofmeasurementId));
    
    if (formValues.categoriesIds.length > 1) {
      formValues.categoriesIds.forEach((id) => {
        console.log('adicionando id categoria', id)
        updatedData.append('categoriesIds', parseInt(id));
      });
    } else if (formValues.categoriesIds.length == 1){
      console.log('adicionando id ', formValues.categoriesIds);
      updatedData.append('categoriesIds[]', [parseInt(formValues.categoriesIds)]);
    }else{
      console.log('não pode categoiries vazio')
    }
  
    updatedData.append('amount', parseInt(formValues.amount));
    updatedData.append('description', formValues.description);
    updatedData.append('price', parseFloat(formValues.price));

    if(formValues.file){
      updatedData.append('file', formValues.file);
    }

    try {
      const response = await axios.patch(`${process.env.REACT_APP_HOST}/products/${props.productId}`, updatedData);
      console.log('Dados atualizados com sucesso!', response.data);
    } catch (error) {
      console.error('Erro ao atualizar dados:', error);
      Swal.fire('Ops...', `Erro ao atualizar dados: ${error}`, 'error');
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData();
    const nameValues = [
      'name',
      'brand',
      'weight',
      'unitsofmeasurementId',
      'amount',
      'description',
      'price',
      'file'
    ];
    const floatConv = [
      'weight',
      'price'
    ];
    const intConv = [
      'amount',
      'unitsofmeasurementId'
    ];

    for (const key in formValues){
      nameValues.map((item) => {
        if (key == item && key){
          if(
            (props.productId && formValues[key] != product[key])
          ||
            !props.productId
          ){
            formData.append(
              key,
              floatConv.includes(item) ? parseFloat(formValues[key]) : ( intConv.includes(item) ? parseInt(formValues[key]) : formValues[key] )
            )
          }

        }
      })
    }

    if (formValues.categoriesIds.length > 1) {
      formValues.categoriesIds.forEach((id) => {
        formData.append('categoriesIds', parseInt(id));
      });
    } else if (formValues.categoriesIds.length == 1){
      formData.append('categoriesIds[]', [parseInt(formValues.categoriesIds)]);
    }else{
      Swal.fire('Ops...', 'O produto deve ter ao menos 1 categoria', 'error');
    }

    if(props.productId){
      console.log('haaaaahahahahaha achou que ia atualizar mesmo kkkkkkkk')
    }else{
      try{
        fetch(`${process.env.REACT_APP_HOST}/products`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*'
          },
          body: formData
        })
          .then((response) => {
            if(!response.ok){
              console.log('response.ok: false', response)
            }
            return response.json();
          }).then((data) => {
            console.log('data', data)
          })
          .catch((error) => {
            console.error(`Erro durante o processamento da solicitação: ${error}`)
            Swal.fire('Ops...', `Erro durante o processamento da solicitação: ${error}`, 'error');
          })
      }catch(error){
        Swal.fire('Ops...', `Erro na solicitação HTTP: ${error}`, 'error');
      }
    }

    //navigate('/admin/product-list')
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
          {/* <h3> Imagem atual: </h3> */}
          
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
              {formValues.file ? (
                <div className='div-img-move'>
                  <img src={URL.createObjectURL(formValues.file)} className="img-produto" alt="Imagem selecionada" />
                </div> 
              ) : (
                <p className="text-dropzone">
                  {product && product.images[0].path && (
                    <img src={`${process.env.REACT_APP_HOST}/uploads/${product.images[0].path}`}/>
                  )}
                  {props.productId && (
                    <div className='text-dropzone-div'> Arraste a nova imagem aqui </div>
                  )}{!props.productId && (
                    <div className='text-dropzone-div'> Arraste a imagem aqui </div>
                  )}
                  
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