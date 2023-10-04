import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Notificationlist.css'
import iziToast from 'izitoast'; 
import 'izitoast/dist/css/iziToast.min.css';

const Notificationlist = () => {
    const [notifications, setnotifications] = useState([]);

    const fetchnotifications = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_HOST}/notifications`);
            setnotifications(response.data);
        } catch (error) {
            iziToast.error({position: 'bottomRight',timeout: 5000,message:"Nenhuma notificação Encontrada "})
            console.error('Erro ao buscar notifications:', error);
        }
    };

    const handleDeletenotification = async (notificationId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_HOST}/notifications/${notificationId}`);
            const updatednotifications = notifications.filter((notification) => notification.id !== notificationId);
            setnotifications(updatednotifications);
        } catch (error) {
            iziToast.error({position: 'bottomRight',timeout: 5000,message:`Erro ao excluir notificação Erro:${error}`})
        }
    };
console.log("notigficação:",notifications)
    useEffect(() => {
        fetchnotifications();
    }, []);

    return (
        <div>
            <div className="notification-list-container">
                <h1 className="titulo-notification">Listagem de notificações</h1>
                <div className="notification-list">
                    {notifications.map((notification) => (
                        <div key={notification.id} className="notification-item">
                            <div className="notification-info">
                                    <p className="p-notification" >{notification.title}</p>
                                <p>{notification.message}</p>
                                </div>
                                <div className="btn-notification">
                                <button className="botao-excluir-notification" onClick={() => handleDeletenotification(notification.id)}>Excluir</button>
                                </div>
                            <div className="notification-link">
                                <p>{notification.link}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Notificationlist;