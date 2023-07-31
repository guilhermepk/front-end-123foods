import React from "react";
import { Link } from "react-router-dom";
import './navbaradm.css'

import {GiKnightBanner} from 'react-icons/gi';
import {TbPaperBag} from 'react-icons/tb';
const NavbarAdm=()=>{
    return(
        <div>
      <div className="admin-container">
    
        <div className="admin-sidebar">
          <h3>Admin Dashboard</h3>
          <ul className="admin-nav">
            <li>
              <Link to="/admin">Home</Link>
            </li>
            <li>
              <Link to="/admin/banner"><GiKnightBanner/>Cadastro de banners</Link>
              <Link to="/admin/banner/list"><GiKnightBanner/>Listagem de banners</Link>
            </li>
            <li>
              <Link to="/admin/products"><TbPaperBag/>Produtos</Link>
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
