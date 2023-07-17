
import { Eye, EyeOff } from 'react-feather';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Navbar.css';
import {CgProfile} from 'react-icons/cg'
import {FiShoppingCart} from 'react-icons/fi'
import {BiSearchAlt} from 'react-icons/bi'
import {AiOutlineClose} from 'react-icons/ai'


const Navbar = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showUserInfoModal, setShowUserInfoModal] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
      setIsAdmin(data.isAdmin);
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
          <div>
          <a href="">
            <img className="logo" src="./imagens/logoSemFundo.png" alt="Logo" />
          </a>
          </div>  
              <div className="search">
              <input type="text" placeholder="     Pesquisar:" className="search-input"/>
            <a href="" className='lupa-a'>
            <BiSearchAlt className='lupa'/>
            </a>
            </div>
          <div className="conteudo">
            <a href="#" onClick={handleProfileClick}>
              <CgProfile className="perfil"/>
            </a>
            {isAdmin && <a href="/outra-pagina">Botão de Admin</a>}
            <a href="">
              <FiShoppingCart className="carrinho"/>
            </a>
          </div>
        </ul>
      </nav>
      {showLoginForm && (
        <div className="modal">
          <div className="modal-content">
          <h2>Login</h2>
            <AiOutlineClose className="close" onClick={closeModal}/>
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
              
              <br />
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
              <button className='login-button' type="submit">Login</button>
              <p className='conta-possuir'>Não possui conta? </p>
              <a href="../Formulariocadastro/formulariocadastro" target="_blank">
                Registre-se agora!
              </a>
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
          <img src={`http://localhost:3000/uploads/${userInfo.image}`} alt="User Image" />
          <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      )}
    </div>
  
  );
};

export default Navbar;
