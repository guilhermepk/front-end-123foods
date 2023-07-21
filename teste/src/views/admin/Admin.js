import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../componentes/Navbar/Navbar";
import './admin.css'
const Admin = () => {
  return (
    <div>
      <div className="admin-container">
    
        <div className="admin-sidebar">
          <h3>Admin Dashboard</h3>
          <ul className="admin-nav">
            <li>
              <Link to="/admin">Home</Link>
            </li>
            <li>
              <Link to="/admin/users">Usuários</Link>
            </li>
            <li>
              <Link to="/admin/products">Produtos</Link>
            </li>
            {/* Adicione mais botões e links conforme necessário */}
          </ul>
        </div>

        {/* Conteúdo da página */}
        <div className="admin-content">
          {/* Adicione aqui o conteúdo específico de cada página */}
        </div>
      </div>
    </div>
  );
};

export default Admin;
