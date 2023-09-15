import React, { useState } from 'react';
import './Notificationform.css'
import Swal from 'sweetalert2';

const Notificationform = () => {
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
                Swal.fire('Sucesso', 'Notificação cadastrada com sucesso', 'success');
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <form onSubmit={handleSubmit} className="form-notification">
            <div className="div-notification">
                <h1 className="h1-notification">Cadastro notificação</h1>
                <div className="div-grid-title">
                    <div className="div-move-self">
            <label>
                Titulo:
                <input
                    required
                    className="title-input"
                    type="text"
                    placeholder=" Digite o título"
                    name="title"
                    value={formValues.title}
                    onChange={handleChange}
                />
            </label>
            <label>
                Link da notificação:
                <input
                    required
                    className="title-input"
                    type="text"
                    placeholder=" ex:www.123foods/salada.com.br"
                    name="link"
                    value={formValues.link}
                    onChange={handleChange}
                />
            </label>
            <label>
                Mensagem:
                <input
                    required
                    type="text"
                    className="title-input"
                    placeholder=" Digite sua mensagem"
                    name="message"
                    value={formValues.message}
                    onChange={handleChange}
                />
            </label>
            </div>
            <div className='button-move'>
            <button className="button-notification" type="submit">Enviar</button>
            </div>
            </div>
            </div>
        </form>
    );
};

export default Notificationform;