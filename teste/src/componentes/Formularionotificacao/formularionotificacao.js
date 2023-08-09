import React, { useState } from 'react';
import './formularionotificacao.css'
const FormularioNotification = () => {
    const [formValues, setFormValues] = useState({
        title: '',
        link: '',
        message: '',

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


        fetch('http://localhost:3000/notifications', {
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
                Titulo:
                <input
                    type="text"
                    name="title"
                    value={formValues.title}
                    onChange={handleChange}
                />
            </label>
            <label>
                Link da notificação:
                <input
                    type="text"
                    placeholder="ex:www.123foods/salada.com.br"
                    name="link"
                    value={formValues.link}
                    onChange={handleChange}
                />
            </label>
            <label>
                Mensagem:
                <textarea
                    type="text"
                    name="message"
                    value={formValues.message}
                    onChange={handleChange}
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};

export default FormularioNotification;