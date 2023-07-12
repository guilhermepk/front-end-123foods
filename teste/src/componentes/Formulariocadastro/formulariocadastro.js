import React, { useState } from 'react';
import Imageupload from './imageupload';

const FormularioCadastroUser = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    date_of_birth: '',
    gender: '',
    cpf: '',
    phone: '',
    email: '',
    password: '',
    city: '',
    street:'',
    state:'',
    cep:'',
  });

  
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleImageUpload = (file) => {
    setFormValues({ ...formValues, image: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendDataToServer(formValues);
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
    formData.append('image', data.image);

    fetch('http://localhost:3000/users', {
      method: 'POST',
      body: formData
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
        <input
          type="text"
          name="gender"
          value={formValues.gender}
          onChange={handleChange}
        />
      </label>
      
      <label>
        CPF:
        <input
          type="text"
          name="cpf"
          value={formValues.cpf}
          onChange={handleChange}
        />
      </label>
      <label>
        Telefone:
        <input
          type="text"
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
      <Imageupload/>
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
        Estado:
        <input
          type="text"
          name="state"
          value={formValues.state}
          onChange={handleChange}
        />
      </label>
      <label>
        CEP:
        <input
          type="text"
          name="cep"
          value={formValues.cep}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormularioCadastroUser;
