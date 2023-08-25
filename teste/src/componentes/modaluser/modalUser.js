
import './ModalUser.css';
import React, { useState, useEffect } from 'react';
import { useUserInfo } from '../UserInfo/UserInfo';
import jwt_decode from 'jwt-decode';
import { IoIosLogOut } from 'react-icons/io';


const ModalUser= ({handleLogout,handleaddress}) => {
    
    const [token, setToken] = useState(null);
    const [decoded_token, setDecodedToken] = useState(null);
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
    
    
    return(
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
                    <button className="botao-enderecos" onClick={handleaddress}>
                        Endereços Cadastrados
                    </button>
                    <div className="botao-sair-top">
                    <button className="botao-sair" onClick={handleLogout}>
                        <IoIosLogOut className="botao-logoutReact" size={20} color="white" />
                            Sair
                    </button>
                    </div>
                </div>

    );
}
export default ModalUser;
