import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Banner from './componentes/Banner/Banner';
import Navbar from './componentes/Navbar/Navbar';
import Filtrocat from './componentes/Filtrocategorias/filtrocategorias';
import Footer from './componentes/Footer/footer';
import FormularioCadastroUser from './componentes/Formulariocadastro/formulariocadastro';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navbar/>
    <Banner/>
    <Filtrocat/>
    <FormularioCadastroUser/>
    <Footer/>
  </React.StrictMode>
);


