import React from "react";
import { Link } from "react-router-dom";
import './navbaradm.css'

import {GiKnightBanner} from 'react-icons/gi';
import {TbPaperBag} from 'react-icons/tb';
const NavbarAdm=()=>{
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  return(
        <div>
      <div className="admin-container">
        <img src={`http://localhost:3000/uploads/${userInfo.image}`} alt="User Image" className="imagem-usuario" />     <p>{userInfo.name}</p>
        <div className="admin-sidebar">
          <h3>Admin Dashboard</h3>
          <ul className="admin-nav">
            <li>
              <Link to="/admin">Home</Link>
            </li>
            <li>
              <Link to="/admin/banner"><GiKnightBanner/>Cadastro de banners</Link>
              <Link to="/admin/bannerlist"><GiKnightBanner/>Listagem de banners</Link>
            </li>
            <li>






              <Link to="/admin/product-register"><TbPaperBag/>Produtos</Link>
            </li>
          </ul>
        </div>

        <div className="admin-content">
        </div>
      </div>
    </div>
    )
}

export default NavbarAdm;
