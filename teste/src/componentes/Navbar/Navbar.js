import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { useUserInfo } from '../UserInfo/UserInfo';
import { CgProfile } from 'react-icons/cg';
import { FiShoppingCart } from 'react-icons/fi';
import { AiOutlineBell } from 'react-icons/ai';
import Search from '../Search/Search';
import Dropzone from 'react-dropzone';
import { Eye, EyeOff } from 'react-feather';
import { IoIosClose } from 'react-icons/io';
import axios from 'axios';
import Swal from 'sweetalert2';
import ModalUser from '../modaluser/modalUser';

import jwt_decode from 'jwt-decode';

import {BsArrowLeftCircle} from 'react-icons/bs';
import PerfilUsuario from '../PerfilUsuario/PerfilUsuario';
import UserAddress from '../Useraddress/UserAddress';

const Navbar = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showUserInfoModal, setShowUserInfoModal] = useState(false);
    const [token, setToken] = useState(null);
    
    const [decoded_token, setDecodedToken] = useState(null);

    const [selectedImage, setSelectedImage] = useState(null);
    
    const userId = decoded_token?.sub; 
    const userInfo=useUserInfo(token,userId);



    const handleProfileClick = () => {
        if (decoded_token) {
            showUserInfoModal ? setShowUserInfoModal(false) : setShowUserInfoModal(true);
        } else {
            showLoginForm ? setShowLoginForm(false) : setShowLoginForm(true);
        }
    };

    const togglePasswordVisibility = (event) => {
        event.preventDefault();
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('payload');
        if (storedToken) {
            setToken(storedToken);
            const decodedToken = jwt_decode(storedToken);
            setDecodedToken(decodedToken);
        }
    }, []);
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLoginFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/users/login', {
                username,
                password,
            });
            const data = response.data;
            const token = data.access_token;
            // console.log('Token:', token);
            // console.log('Sucesso no Login:', data);
            setError('');
            setShowLoginForm(false);
            setToken(token);
            setDecodedToken(jwt_decode(token));
            localStorage.setItem('payload', token);
            setShowUserInfoModal(true);
            Swal.fire('Bem vindo', 'Login bem sucedido', 'success');
        } catch (error) {
            setError('Email ou Senha incorretos');
            Swal.fire('Ops...', 'Erro ao completar o login...', 'error');
        }

        setUsername('');
        setPassword('');

        setShowUserInfoModal(false);
    };
   
    
    const handleLogout = () => {
        console.log('userinfo: ', userInfo)
        setToken(null);
        setDecodedToken(null);
        localStorage.removeItem('payload');
        closeModal(true)
    };

    const closeModal = () => {
        setShowLoginForm(false);
        setShowUserInfoModal(false);
    };
    //console.log('token',decoded_token)

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
                        <h1 className="login">Login</h1>
                        <form className="login-form" onSubmit={handleLoginFormSubmit}>
                            <label className="password-label"> 
                                Email:
                            </label>
                            <input
                                className="password-input" type="text"
                                value={username}
                                onChange={handleUsernameChange}
                                required
                                placeholder='Digite seu email'
                            />
                            <br/>
                            <label className="password-label" htmlFor="password2">
                                Senha:{' '}
                            </label>
                            <input
                                className="password-input "
                                obrigatorio={true}
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Digite sua senha"
                            />
                            <button className="password-input-icon" onClick={togglePasswordVisibility}>
                                {showPassword ? <Eye /> : <EyeOff />}
                            </button>
                            <button className='login-button' type="submit"><li className="login-text">Login</li></button>
                            <p className='conta-possuir'>Não possui conta? </p>

                            <a href='/user-register' target='_blank'> Registre-se agora! </a>
                        </form>
                    </div>
                </div>
            )}
            {showUserInfoModal && (
            <div className="modal-usuario">
            <ModalUser
            handleLogout={handleLogout}


            />
            <div className="modal-conteudo">
            <a onClick={closeModal}> 
                        <BsArrowLeftCircle className="seta-voltar" />
                    </a>
                {/* <PerfilUsuario /> */}
                <UserAddress></UserAddress>
            </div>
            </div>
            
            
            
            )}
    </div>
  );
};
export default Navbar;