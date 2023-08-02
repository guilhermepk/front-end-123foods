import { Eye, EyeOff} from 'react-feather';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Navbar.css';
import {CgProfile} from 'react-icons/cg';
import {FiShoppingCart} from 'react-icons/fi';
import {IoIosClose} from 'react-icons/io';
import {AiOutlineBell} from 'react-icons/ai';
import {BiMenu} from 'react-icons/bi';
import Search from '../Search/Search';
import Dropzone from "react-dropzone";

const Navbar = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showUserInfoModal, setShowUserInfoModal] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showImageUploadModal, setShowImageUploadModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageDrop = (acceptedFiles) => {
    setSelectedImage(acceptedFiles[0]);
  };

  const fetchUpdatedUserInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${userInfo.id}`);
      const data = response.data;
      return data;
    } catch (error) {
      console.error('Erro ao buscar os dados do usuário:', error);
      return null;
    }
  };

  const handleUploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append('file', selectedImage);

      await axios.patch(`http://localhost:3000/users/${userInfo.id}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });


      const updatedUserInfo = await fetchUpdatedUserInfo();

      if (updatedUserInfo) {
        setUserInfo(updatedUserInfo);
        localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
      }

      setSelectedImage(null);
      setShowImageUploadModal(false);
    } catch (error) {
      console.error('Erro ao enviar a imagem:', error);
    }
  };
  const [showUploadButton, setShowUploadButton] = useState(false);

  const handleImageUploadButtonClick = () => {
    setShowImageUploadModal(true);
  };

const togglePasswordVisibility = (event) => {
      event.preventDefault();
      setShowPassword(!showPassword);
    };

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
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
    setUserInfo(null);
    localStorage.removeItem('userInfo');
  };

  const handleProfileClick = () => {
    if (userInfo) {
      setShowUserInfoModal(true);
    } else {
      setShowLoginForm(true);
    }
  };

  const handleLoginFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/users/login', {
        username,
        password,
      });
      const data = response.data;
      console.log('Sucesso no Login:', data);
      setError('');
      setShowLoginForm(false);
      setUserInfo(data);
      setShowUserInfoModal(true);
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      setError ('Email ou Senha incorretos');
    }

    setUsername('');
    setPassword('');
  };

  const closeModal = () => {
    setShowLoginForm(false);
    setShowUserInfoModal(false);
  };
  
  return (
    <div className="container-fluid">
      <nav className="navbar">
        <ul className="nav-list">
          <div className="logo">
            <a href=''> <img src="./imagens/logoSemFundo.png" alt="Logo" /> </a>
          </div>
          <div className="categorias">
        <div>
          <BiMenu className="categoria-icon"/>
        </div>
      </div>  
              <Search/>
          <div className="conteudo">
            <a href="#" onClick={handleProfileClick}>
              <CgProfile className="perfil"/>
            </a>
            {userInfo && userInfo.admin && (
              <a href="/admin"><button> Admin </button></a>
            )}
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
          <h1>Login</h1>
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
              <br />
              {error && <p>{error}</p>}
              <button className='login-button' type="submit"><li className="login-text">Login</li></button>
              <p className='conta-possuir'>Não possui conta? </p>

              <a href='/user-register' target='_blank'> Registre-se agora! </a>

            </form>
          </div>
        </div>
      )}
      {showUserInfoModal && userInfo && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Informações do Usuário</h2>
           <p>Nome: {userInfo.name}</p>
         <p>Email: {userInfo.email}</p>
         <p>Telefone: {userInfo.phone}</p>
         <p>CPF: {userInfo.cpf}</p>
          <p>Endereço: {userInfo.street}</p>
            <div className="user-image-container" onMouseEnter={() => setShowUploadButton(true)} onMouseLeave={() => setShowUploadButton(false)}>
              <img src={`http://localhost:3000/uploads/${userInfo.image}`} alt="User Image" className="imagem-usuario" />
              {showUploadButton && (
                  <button className="botao-hover" onClick={handleImageUploadButtonClick}>Atualizar Imagem</button>
              )}
            </div>
            {showImageUploadModal && (
                <div  className="image-upload-modal">
                  <div  className="image-upload-modal-content">
      <span className="close" onClick={() => setShowImageUploadModal(false)}>
        &times;
      </span>
                    <h2>Atualizar Imagem do Usuário</h2>
                    <form onSubmit={handleUploadImage}>
                    <Dropzone onDrop={handleImageDrop}>
                      {({ getRootProps, getInputProps }) => (
                          <div className="dropzone" {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Arraste e solte uma imagem aqui, ou clique para selecionar uma imagem.</p>
                            {selectedImage && (
                                <div>
                                  <p>Imagem selecionada: {selectedImage.name}</p>
                                  <img src={URL.createObjectURL(selectedImage)} alt="Imagem selecionada" />
                                </div>
                            )}
                          </div>
                      )}
                    </Dropzone>
                      <button type={"submit"}>Salvar</button>
                    </form>

                  </div>
                </div>
            )}

            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      )}
    </div>
  
  );
};
  
export default Navbar;
