import React from 'react';
import './Navbar.css';
import { useState } from 'react';
import {CgProfile} from 'react-icons/cg';
import {FiShoppingCart} from 'react-icons/fi';
import {AiOutlineBell} from 'react-icons/ai';
import {BiMenu} from 'react-icons/bi';
import Search from '../Search/Search';
import UserInfo from '../UserInfo/UserInfo';


const Navbar = () => {
  const [teste, setTeste] = useState(false);

  console.log(teste)

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
            
            <a href="#" onClick={() => {
              teste ? setTeste(false) : setTeste(true)
            }}>
              <CgProfile className="perfil"/>
            </a>

            {UserInfo.userInfo && UserInfo.userInfo.admin && (
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
      {teste && <UserInfo/>}
    </div>
  );
};
  
export default Navbar;
