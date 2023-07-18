import React, { useState } from 'react';

const FormularioCadastro = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    brand: '',
    weight: '',
    unit_of_measurement: '',
    category: '',
    qtd: '',
    description: '',
    price: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendDataToServer(formValues);
  };

  const sendDataToServer = (data) => {
    // Verifique se os campos weight, qtd e price são números válidos
    data.weight = parseFloat(data.weight);
    data.qtd = parseInt(data.qtd);
    data.price = parseFloat(data.price);
  
    fetch('http://localhost:3000/foods', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
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
      Brand:
      <input
        type="text"
        name="brand"
        value={formValues.brand}
        onChange={handleChange}
      />
    </label>
    <label>
      Weight:
      <input
        type="text"
        name="weight"
        value={formValues.weight}
        onChange={handleChange}
      />
    </label>
    <label>
      Unit of Measurement:
      <input
        type="text"
        name="unit_of_measurement"
        value={formValues.unit_of_measurement}
        onChange={handleChange}
      />
    </label>
    <label>
      Category:
      <input
        type="text"
        name="category"
        value={formValues.category}
        onChange={handleChange}
      />
    </label>
    <label>
      Quantity:
      <input
        type="text"
        name="qtd"
        value={formValues.qtd}
        onChange={handleChange}
      />
    </label>
    <label>
      Description:
      <input
        type="text"
        name="description"
        value={formValues.description}
        onChange={handleChange}
      />
    </label>
    <label>
      Price:
      <input
        type="text"
        name="price"
        value={formValues.price}
        onChange={handleChange}
      />
    </label>
    <button type="submit">Submit</button>
  </form>
  );
};

export default FormularioCadastro;