import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './Formulariocadastrouser.css'
import InputMask from 'react-input-mask';
import iziToast from 'izitoast';

const FormularioCadastroUser = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    date_of_birth: '',
    gender: '',
    cpf: '',
    phone: '+55',
    email: '',
    password: '',
    city: '',
    street:'',
    state:'',
    cep:'',
    numberhouse:'',
    image: null,
  });

  const [userCEP, setUserCEP] = useState('');


  const handleFileDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFormValues({ ...formValues, image: file });
  }, [formValues]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFileDrop,
    accept: 'image/*',
    multiple: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    sendDataToServer(formValues);
  };
  const handleSuccess = () => {
    iziToast.success({
      title: 'Sucesso',
      message: 'Cadastrado com sucesso',
      timeout: 10000,
      onClosing: () => {
       // window.close();
      },
    });
  };

  const handleError = (error) => {
    console.error(error);
    iziToast.error({
      title: 'Erro',
      message: 'Ocorreu um erro durante o cadastro',
    });
  };

  const sendDataToServer = (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('date_of_birth', data.date_of_birth);
    formData.append('gender', data.gender);
    formData.append('cpf', data.cpf);
    formData.append('phone', data.phone);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('city', data.city);
    formData.append('street', data.street);
    formData.append('state', data.state);
    formData.append('cep', data.cep);


    
    if (formValues.image!=null){
      formData.append('file', data.image);
    }

    formData.append('numberhouse', data.numberhouse);

    fetch('http://localhost:3000/users', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        handleSuccess();
      })
      .catch(error => {
        console.error(error);
        handleError(error);
      });
  };
  const handleCEPChange = (e) => {
    const { value } = e.target;
    setFormValues({ ...formValues, cep: value });
  };
  const genderOptions = ['Masculino', 'Feminino', 'Outros'];
  const handleCEPBlur =async () => {
    const cep = formValues.cep.replace(/\D/g, '');
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
          throw new Error('CEP inválido');
        }

        setFormValues((prevFormValues) => ({
          ...prevFormValues,
          state: data.uf,
          city: data.localidade,
          street: data.logradouro,
          cep: data.cep,
        }));
      } catch (error) {
        console.error(error);
        iziToast.error({
          title: 'Erro',
          message: 'CEP inválido',
        });
      }
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  {/*eu não sei*/}

  return (
    <div>
      <h1> Cadastre-se! </h1>
    <form className="form-user"  onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formValues.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Data de Nascimento:
        <input
          type="date"
          name="date_of_birth"
          value={formValues.date_of_birth}
          onChange={handleChange}
        />
      </label>
      <label>
        Gênero:
        <select className="gender-input" name="gender" value={formValues.gender} onChange={handleChange}>
          <option value="">Selecione</option>
          {genderOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
          ))}
        </select>
      </label>
      <label>
        CPF:
        <InputMask
            mask="999.999.999-99"
          type="text"
          name="cpf"
          value={formValues.cpf}
          onChange={handleChange}
        />
      </label>
      <label>
        Telefone:
        <InputMask
            mask="+99 (99) 99999-9999"
            name="phone"
            value={formValues.phone}
            onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Senha:
        <input
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
        />
      </label>
      <label>
      CEP:
        <InputMask
            mask="99999-999"
            type="text"
            name="cep"
            value={formValues.cep}
            onChange={handleCEPChange}
            onBlur={handleCEPBlur}
        />
    </label>
      <label>
        Cidade:
        <input
          type="text"
          name="city"
          value={formValues.city}
          onChange={handleChange}
        />
      </label>
      <label>
        Rua:
        <input
          type="text"
          name="street"
          value={formValues.street}
          onChange={handleChange}
        />
      </label>
      <label>
        Numero ou Apto:
        <input
          type="text"
          name="numberhouse"
          value={formValues.numberhouse}
          onChange={handleChange}
        />
      </label>
      <label>
        Estado:
        <input
          type="text"
          name="state"
          value={formValues.state}
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
      <button className="button-login" type="submit">Submit</button>
    </form></div>
  );
};

export default FormularioCadastroUser;


