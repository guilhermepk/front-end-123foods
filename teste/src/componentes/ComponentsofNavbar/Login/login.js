import { Eye, EyeOff } from 'react-feather';
import React, { useState, useEffect } from 'react';
import './Login.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';

const Login=()=>{
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showUserInfoModal, setShowUserInfoModal] = useState(false);
    const [token, setToken] = useState(null);
    const [decoded_token, setDecodedToken] = useState(null)
    const togglePasswordVisibility = (event) => {
        event.preventDefault();
        setShowPassword(!showPassword);
    };
    

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    

    const handleLoginFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_HOST}/users/login`, {
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
            setTimeout(()=>{window.location.reload()},1500);
            
        } catch (error) {
            setError('Email ou Senha incorretos');
            Swal.fire('Ops...', 'Erro ao completar o login...', 'error');
        }

        setUsername('');
        setPassword('');
        setShowUserInfoModal(false);  
    };


return(
    <div>
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
                            <button className="password-input-icon" onClick={(e) => togglePasswordVisibility(e)}>
                                {showPassword ? <Eye /> : <EyeOff />}
                            </button>
                            <div className='button-move'>
                            <button className='login-button' type="submit">Login</button>
                            <p className='conta-possuir'>Não possui conta? </p>
                            <a href='/user-register' target='_blank'> Registre-se agora! </a>
                            </div>
                        </form>
    </div>

)
}
export default Login;