import React, { useState,useEffect } from "react";
import { useUserinfo } from '../../Userinfo/Userinfo.js';
import './NavigationbarAdm.css'
import jwt_decode from 'jwt-decode';
import{AiTwotoneNotification} from 'react-icons/ai'
import {FaImage} from 'react-icons/fa';
import {TbPaperBag} from 'react-icons/tb';
import {RiNotificationBadgeFill}from 'react-icons/ri'

const NavigationbarAdm = () => {
  
  const [minimized, setMinimized] = useState(false);
  const token = localStorage.getItem('payload');
  const decoded_token = jwt_decode(token);
    const userId = decoded_token?.sub; 
    const userInfo=useUserinfo(token,userId);
  const toggleMinimize = () => {
    setMinimized(!minimized);
  };
  
  return(
      <div>
        <div className={`admin-container ${minimized ? 'hide-content' : ''}`}>
          <div className={`admin-sidebar ${minimized ? 'minimized' : ''}`}>
            <div className="user-column" onClick={toggleMinimize}>
              {userInfo && (
                <img
                  src={`http://localhost:3000/uploads/${userInfo.image}`}
                  alt="User Image"
                  className={`imagem-usuario ${minimized ? 'minimized' : ''}`}
                />
              )}
              <div className="navbar-adm-main">
                {userInfo && (<p className="nameuser">{userInfo.name}</p>)}
              </div>
              <h3 className="titulo-admin">Admin Dashboard</h3>
            </div>
            <ul className={`admin-nav ${minimized ? 'hidden' : ''}`}>
          
              <a href="/" className="item-list">
                Home
              </a>
              <a href="/admin" className="item-list">
                Admin Home
              </a>
              <a href="/admin/banner" className="item-list">
                <div className="item-icon"><FaImage/></div>Cadastro de banners
              </a>
              <a href="/admin/bannerlist" className="item-list">
                <div className="item-icon"><FaImage/></div>Listagem de banners
              </a>
              <a href="/admin/product-register" className="item-list">
                <div className="item-icon"><TbPaperBag/></div>Cadastrar Produtos
              </a>
              <a href="/admin/product-list" className="item-list">
                <div className="item-icon"><TbPaperBag/></div> Lista de Produtos
              </a>
              <a href="/admin/notifications" className="item-list">
                <div className="item-icon"><AiTwotoneNotification/></div>Criar Notificação
              </a>
              <a href="/admin/notifications/list" className="item-list">
                <div className="item-icon"><RiNotificationBadgeFill/></div> Lista de Notificações
              </a>
            </ul>
           
          </div>

          <div className={`admin-content ${minimized ? 'minimized-content' : ''}`}>
          </div>
        </div>
    </div>
    )
}

export default NavigationbarAdm;
