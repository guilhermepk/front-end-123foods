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


import jwt_decode from 'jwt-decode';

import {BsArrowLeftCircle} from 'react-icons/bs';



const Navbar = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showUserInfoModal, setShowUserInfoModal] = useState(false);
    const [token, setToken] = useState(null);
    
    const [decoded_token, setDecodedToken] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showUploadButton,setShowUploadButton] = useState(null);
    const [showImageUploadModal, setShowImageUploadModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    
    const userId = decoded_token?.sub; 
    const userInfo=useUserInfo(token,userId);



    const handleProfileClick = () => {
        if (decoded_token) {
            setShowUserInfoModal(!showUserInfoModal);
        } else {
            setShowLoginForm(true);
        }
    };


    const handleImageDrop = (acceptedFiles) => {
        setSelectedImage(acceptedFiles[0]);
    };

   
    const handleUploadImage = async () => {
        try {
            const formData = new FormData();
            formData.append('file', selectedImage);

            await axios.patch(`http://localhost:3000/users/${decoded_token.sub}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            })
            setSelectedImage(null);
            setShowImageUploadModal(false);
        } catch (error) {
            console.error('Erro ao enviar a imagem:', error);
        }
    };

    const handleImageUploadButtonClick = () => {
        setShowImageUploadModal(true);
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

    const handleLogout = () => {
        setIsLoggedIn(false);
        setToken(null);
        setDecodedToken(null);
        localStorage.removeItem('payload');
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
            console.log('Token:', token);
            console.log('Sucesso no Login:', data);
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
    };

    const closeModal = () => {
        setShowLoginForm(false);
        setShowUserInfoModal(false);
    };
    console.log('token',decoded_token)

  return (
    <div className="container-fluid">
      <nav className="navbar">
        <ul className="nav-list">
          <div className="logo">
            <a href=''> <img src="./imagens/logoSemFundo.png" alt="Logo" /> </a>
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
            {showUserInfoModal && userInfo && (
                <div className="modal-usuario">
                    <div className="modal-usuario1">
                        <button className="botao-perfil">
                            Meu perfil
                        </button>
                        <button className="botao-compras">
                            Minhas compras
                        </button>
                        <button className="botao-historico">
                            Histórico de Compras
                        </button>
                        <button className="botao-enderecos">
                            Endereços Cadastrados
                        </button>
                        <div className="botao-sair-top">
                        <button className="botao-sair" onClick={handleLogout}>Sair</button>
                        </div>
                    </div>
                   <div className="modal-conteudo">
                    <a onClick={closeModal}> 
                        <BsArrowLeftCircle className="seta-voltar" />
                    </a>
                        <h2 className="perfil-usuario">
                            Olá, {userInfo.name}</h2>
                        <div className="user-image-container" onMouseEnter={() => setShowUploadButton(true)} onMouseLeave={() => setShowUploadButton(false)}>
                            {userInfo.image && (
                                <img src={`http://localhost:3000/uploads/${userInfo.image}`} alt="User Image" className="imagem-perfil" />
                            )}
                            {!userInfo.image && (
                                <img src={`http://localhost:3000/uploads/imagem-padrao.gif`} alt="Default User Image" className="imagem-perfil"/>
                            )}
                            {showUploadButton && (
                                <button className="botao-hover" onClick={handleImageUploadButtonClick}>Atualizar Imagem</button>
                            )}
                        </div>
                        <div className="conta-usuario">
                        <label className="label-dados">
                            Nome:
                        </label>
                        <input
                        className="dados-pessoais" type='text'
                        value={userInfo.name}
                        disabled
                        />
                        <label className="label-dados">
                            Email:
                        </label>
                        <input
                        className="dados-pessoais" type='text'
                        value={userInfo.email}
                        disabled
                        />
                        <label className="label-dados">
                            Telefone:
                        </label>
                        <input
                        className="dados-pessoais" type='text'
                        value={userInfo.phone}
                        disabled
                        />
                        <label className="label-dados">
                            CPF:
                        </label>
                        <input
                        className="dados-pessoais" type='text'
                        value={userInfo.cpf}
                        disabled
                        />
                        <button className="button-alterar">
                            Alterar informações
                        </button>
                        {/* <label>
                            Endereço:
                        </label>
                        <input
                        className="dados-pessoais" type='text'
                        value={userInfo.street}
                        disabled
                        /> */}
                        </div>
                        {showImageUploadModal && (
                            <div  className="image-upload-modal">
                            <div  className="image-upload-modal-content">
                                <span className="close-image" onClick={() => setShowImageUploadModal(false)}>
                                    &times;
                                </span>
                                    <h2 className="atualizar-imagem">Atualizar Imagem do Usuário</h2>
                                    <p className="selecionar-imagem">Selecionar imagem:</p>
                                    <form className="form-imagem" onSubmit={handleUploadImage}>
                                        <Dropzone onDrop={handleImageDrop}>
                                            {({ getRootProps, getInputProps }) => (
                                                <div className="dropzone" {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    {selectedImage && (
                                                        <div>
                                                            
                                                            <img src={URL.createObjectURL(selectedImage)} alt="Imagem selecionada"  className='imagem-selecionar'/>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </Dropzone>
                                        <button  className="botao-salvar" type="submit">Salvar</button>
                                    </form>
                            </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
    </div>
  );
};
  
export default Navbar;