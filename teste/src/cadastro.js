import React from 'react';
import ReactDOM from 'react-dom/client';
import Banner from './componentes/Banner';
import Navbar from './componentes/Navbar/Navbar';
import FormularioCadastroUser from './componentes/Formulariocadastro/formulariocadastro';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navbar/>
    <Banner/>
    <FormularioCadastroUser/>
  </React.StrictMode>
);


