import React, { useState } from "react";
import { Link } from "react-router-dom";
import './navbaradm.css'
import{AiTwotoneNotification} from 'react-icons/ai'
import {FaImage} from 'react-icons/fa';
import {TbPaperBag} from 'react-icons/tb';
import {RiNotificationBadgeFill}from 'react-icons/ri'
const NavbarAdm=()=>{
  const [minimized, setMinimized] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const toggleMinimize = () => {
    setMinimized(!minimized);
  };
  return(
      <div>
        <div className={`admin-container ${minimized ? 'hide-content' : ''}`}>
          <div className={`admin-sidebar ${minimized ? 'minimized' : ''}`}>
            <div className="user-column" onClick={toggleMinimize}>
              <img
                  src={`http://localhost:3000/uploads/${userInfo.image}`}
                  alt="User Image"
                  className={`imagem-usuario ${minimized ? 'minimized' : ''}`}
              />
              {!minimized && <p className="nameuser">{userInfo.name}</p>}
            </div>
            <h3 className={minimized ? 'hidden' : ''}>Admin Dashboard</h3>
            <ul className={`admin-nav ${minimized ? 'hidden' : ''}`}>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/admin">Admin Home</Link>
              </li>
              <li>
                <Link to="/admin/banner"><FaImage/>Cadastro de banners</Link>
                <Link to="/admin/bannerlist"><FaImage/>Listagem de banners</Link>
              </li>
              <li>
                <Link to="/admin/product-register"><TbPaperBag/>Cadastrar Produtos</Link>
                <Link to='/admin/product-list'> <TbPaperBag/> Lista de Produtos </Link>

              </li>
              <li>
                <Link to="/admin/notifications"><AiTwotoneNotification/>Criar Notificação</Link>
                <Link to='/admin/notifications-list'> <RiNotificationBadgeFill/> Lista de Notificações</Link>

              </li>
            </ul>
          </div>

          <div className={`admin-content ${minimized ? 'minimized-content' : ''}`}>
          </div>
        </div>
    </div>
    )
}

export default NavbarAdm;
