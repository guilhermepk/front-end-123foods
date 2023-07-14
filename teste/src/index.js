import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Banner from './componentes/Banner';
import Navbar from './componentes/Navbar/Navbar';
import FormularioCadastroUser from './componentes/Formulariocadastro/formulariocadastro';
import Imageupload from './componentes/Formulariocadastro/imageupload';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navbar/>
    <Banner/>
    <Imageupload/>
    
   

  </React.StrictMode>
);


