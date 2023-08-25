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
import Myshopping from '../Myshopping/Myshopping';
import AddressCadastro from '../Useraddress/UserAddresscadastro';
import PurchasesHistoric from '../purchaseshistoric/purchaseshistoric';

const Navbar = () => {

    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showUserInfoModal, setShowUserInfoModal] = useState(false);
    const [token, setToken] = useState(null);
    const [decoded_token, setDecodedToken] = useState(null)
    const [showUserinf,setshowUserinf]=useState(true);
    const [showMyshoppins,setshowMyshoppins]=useState(false);
    const [showpurchasesHistoric,setshowpurchasesHistoric]=useState(false);
    const [ShowregisterAddress,setshowregisteraddress]=useState(false);
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
        setshowMyshoppins(false)
        setshowaddress(false);
        setshowUserinf(true);
        setshowregisteraddress(false);
        setshowpurchasesHistoric(false)
        if (decoded_token) {
            showUserInfoModal ? setShowUserInfoModal(false) : setShowUserInfoModal(true);
        } else {
            showLoginForm ? setShowLoginForm(false) : setShowLoginForm(true);
        }
    };
    const handlemyshoppings=()=>{
        setshowMyshoppins(true)
        setshowaddress(false);
        setshowUserinf(false);
        setshowregisteraddress(false);
        setshowpurchasesHistoric(false)
    }
    const handlemyprofile=()=>{
        setshowMyshoppins(false)
        setshowaddress(false);
        setshowUserinf(true);
        setshowregisteraddress(false);
        setshowpurchasesHistoric(false)
    }

    const handlepurchasesHistoric=()=>{
        setshowMyshoppins(false)
        setshowpurchasesHistoric(true)
        setshowaddress(false);
        setshowUserinf(false);
        setshowregisteraddress(false)
    }

    const handleregisterAddress=()=>{
        setshowMyshoppins(false)
        setshowaddress(false);
        setshowUserinf(false);
        setshowregisteraddress(true)
        setshowpurchasesHistoric(false)
    }

    
    const handleLogout = () => {
        console.log('userinfo: ', userInfo)
        setToken(null);
        setDecodedToken(null);
        localStorage.removeItem('payload');
        closeModal(true)
    }

    const handleaddress=()=>{
        setshowMyshoppins(false)
        setshowaddress(true);
        setshowUserinf(false);
        setshowregisteraddress(false)
        setshowpurchasesHistoric(false)
    }

    const closeModal = () => {
        setShowLoginForm(false);
        setshowregisteraddress(false)
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
            handlemyshoppings={handlemyshoppings}
            handlemyprofile={handlemyprofile}
            handlepurchasesHistoric={handlepurchasesHistoric}
            />
            <div className="modal-conteudo">
            <a onClick={closeModal}> 
                <BsArrowLeftCircle className="seta-voltar" />
            </a>
                {showUserinf &&(<PerfilUsuario />)}
                {showpurchasesHistoric &&(<PurchasesHistoric />)}
                {showMyshoppins &&(<Myshopping />)}
                {Showaddress &&(<UserAddress handleregisterAddress={handleregisterAddress} />)}    
                {ShowregisterAddress&&(<AddressCadastro /> )
                }
            </div>
            </div>

            )}
    </div>
  );
};

export default Navbar;