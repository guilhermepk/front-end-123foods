import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { useUserInfo } from '../UserInfo/UserInfo';
import { CgProfile } from 'react-icons/cg';
import { FiShoppingCart } from 'react-icons/fi';
import { AiOutlineBell } from 'react-icons/ai';
import Search from '../Search/Search';
import { IoIosClose } from 'react-icons/io';
import ModalUser from '../modaluser/modalUser';

import jwt_decode from 'jwt-decode';

import {BsArrowLeftCircle} from 'react-icons/bs';
import PerfilUsuario from '../PerfilUsuario/PerfilUsuario';
import UserAddress from '../Useraddress/UserAddress';
import Login from '../Login/login';

const Navbar = () => {

    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showUserInfoModal, setShowUserInfoModal] = useState(false);
    const [token, setToken] = useState(null);
    const [decoded_token, setDecodedToken] = useState(null)
    const [showUserinf,setshowUserinf]=useState(true);
    ;
    const [Showaddress,setshowaddress]=useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    
    const userId = decoded_token?.sub; 
    const userInfo=useUserInfo(token,userId);
 useEffect(() => {
        const storedToken = localStorage.getItem('payload');
        if (storedToken) {
            setToken(storedToken);
            const decodedToken = jwt_decode(storedToken);
            setDecodedToken(decodedToken);
        }
    }, []);


    const handleProfileClick = () => {
        if (decoded_token) {
            showUserInfoModal ? setShowUserInfoModal(false) : setShowUserInfoModal(true);
        } else {
            showLoginForm ? setShowLoginForm(false) : setShowLoginForm(true);
            console.log('dt', decoded_token)
        }
    };

    
    const handleLogout = () => {
        console.log('userinfo: ', userInfo)
        setToken(null);
        setDecodedToken(null);
        localStorage.removeItem('payload');
        closeModal(true)
    }

    const handleaddress=()=>{
        setshowaddress(true);
        setshowUserinf(false);
    }

    const closeModal = () => {
        setShowLoginForm(false);
        setshowaddress(false)
        setshowUserinf(true)
        setShowUserInfoModal(false);
    };


  return (
    <div className="container-fluid">
      <nav className="navbar">
        <ul className="nav-list">
          <div className="logo">
            <a href=''> <img src="./imagens/logoSemFundo.png" alt="Logo" className="logo-123"/> </a>
          </div>  
              <Search/>
          <div className="conteudo">
          {decoded_token && decoded_token.admin && (
              <a href="/admin"><button className="botao-admin"> Admin </button></a>
            )}
            <a href="#" onClick={handleProfileClick}>
              <CgProfile className="perfil"/>
            </a>

            <a href="">
              <FiShoppingCart className="carrinho"/>
            </a>

            <a href="">
              <AiOutlineBell className="notificacao"/>
            </a>
          </div>
        </ul>
      </nav>
      {showLoginForm && (
                <div className="modal">
                    <div className="modal-content">
                        <IoIosClose className="close" onClick={closeModal}/>
                        <Login />
                    </div>
                </div>
            )}
            {showUserInfoModal && (
            <div className="modal-usuario">
            <ModalUser
            handleLogout={handleLogout}
            handleaddress={handleaddress}
            />
            <div className="modal-conteudo">
            <a onClick={closeModal}> 
                <BsArrowLeftCircle className="seta-voltar" />
            </a>
                {showUserinf&&(<PerfilUsuario />)}
                {Showaddress &&(<UserAddress />)}    
            </div>
            </div>

            )}
    </div>
  );
};

export default Navbar;