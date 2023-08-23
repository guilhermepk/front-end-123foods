
import '../Navbar/Navbar.css';
import React, { useState, useEffect } from 'react';
import { useUserInfo } from '../UserInfo/UserInfo';
import jwt_decode from 'jwt-decode';


const ModalUser= ({handleLogout,}) => {
    
    const [token, setToken] = useState(null);
    const [decoded_token, setDecodedToken] = useState(null);
    const userId = decoded_token?.sub; 
    const userInfo=useUserInfo(token,userId);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showUserInfoModal, setShowUserInfoModal] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem('payload');
        if (storedToken) {
            setToken(storedToken);
            const decodedToken = jwt_decode(storedToken);
            setDecodedToken(decodedToken);
        }
    }, []);
    
    
    // const handleLogout = () => {
    //     console.log('userinfo: ', userInfo)
    //     setToken(null);
    //     setDecodedToken(null);
    //     localStorage.removeItem('payload');
    //     window.location.reload()
    // };

    return(
<div>
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
</div>





    );
}
export default ModalUser;
