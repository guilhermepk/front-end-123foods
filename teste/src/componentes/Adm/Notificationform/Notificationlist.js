import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Notificationlist.css'


const Notificationlist = () => {
    const [notifications, setnotifications] = useState([]);

    const fetchnotifications = async () => {
        try {
            const response = await axios.get('http://localhost:3000/notifications');
            setnotifications(response.data);
        } catch (error) {
            console.error('Erro ao buscar notifications:', error);
        }
    };

    const handleDeletenotification = async (notificationId) => {
        try {
            await axios.delete(`http://localhost:3000/notifications/${notificationId}`);
            const updatednotifications = notifications.filter((notification) => notification.id !== notificationId);
            setnotifications(updatednotifications);
        } catch (error) {
            console.error('Erro ao excluir notification:', error);
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