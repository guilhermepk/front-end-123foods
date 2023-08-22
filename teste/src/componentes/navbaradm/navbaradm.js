import React, { useState,useEffect } from "react";
import axios from 'axios';
import { useUserInfo } from '../UserInfo/UserInfo';
import { Link } from "react-router-dom";
import './navbaradm.css'
import jwt_decode from 'jwt-decode';
import{AiTwotoneNotification} from 'react-icons/ai'
import {FaImage} from 'react-icons/fa';
import {TbPaperBag} from 'react-icons/tb';
import {RiNotificationBadgeFill}from 'react-icons/ri'
const NavbarAdm=()=>{
  
  const [minimized, setMinimized] = useState(false);
  const token = localStorage.getItem('payload');
  const decoded_token = jwt_decode(token);
    const userId = decoded_token?.sub; 
    const userInfo=useUserInfo(token,userId);
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
            <h3 className={minimized ? 'hidden' : ''}>Admin Dashboard</h3>
            </div>
            <ul className={`admin-nav ${minimized ? 'hidden' : ''}`}>
              <div className="main-adm">
              <li className="li-itens">
                <Link to="/">Home</Link>
              </li>
              <li className="li-itens">
                <Link to="/admin">Admin Home</Link>
              </li>
              <li className="li-itens">
                <Link to="/admin/banner"><FaImage/>Cadastro de banners</Link>
              </li>
              <li className="li-itens">
              <Link to="/admin/bannerlist"><FaImage/>Listagem de banners</Link>
              </li>
              <li className="li-itens">
                <Link to="/admin/product-register"><TbPaperBag/>Cadastrar Produtos</Link>
              </li>
              <li className="li-itens">
              <Link to='/admin/product-list'> <TbPaperBag/> Lista de Produtos </Link>
              </li>
              <li className="li-itens">
                <Link to="/admin/notifications"><AiTwotoneNotification/>Criar Notificação</Link>
              </li>
              <li className="li-itens">
              <Link to='/admin/notifications-list'> <RiNotificationBadgeFill/> Lista de Notificações</Link>
              </li>
              </div>
            </ul>
           
          </div>

          <div className={`admin-content ${minimized ? 'minimized-content' : ''}`}>
          </div>
        </div>
    </div>
    )
}

export default NavbarAdm;
