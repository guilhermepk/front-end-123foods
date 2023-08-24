import { Eye, EyeOff } from 'react-feather';
import React, { useState, useEffect } from 'react';
import '../Navbar/Navbar.css';
const Login=(handleLoginFormSubmit,handleUsernameChange)=>{
    const togglePasswordVisibility = (event) => {
        event.preventDefault();
        setShowPassword(!showPassword);
    };
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


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

)
}
export default Login;