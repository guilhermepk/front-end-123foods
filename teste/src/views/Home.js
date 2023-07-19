import { Link } from "react-router-dom";

import Banner from '../componentes/Banner/Banner';
import Navbar from '../componentes/Navbar/Navbar';
import Filtrocat from '../componentes/Filtrocategorias/filtrocategorias';
import Footer from '../componentes/Footer/footer';
import FormularioCadastroUser from '../componentes/Formulariocadastro/formulariocadastro';

const Home = () => {
    return (
        <div>
            <Navbar/>
            <Banner/>
            <Filtrocat/>
            <p> <Link to='/pagina-exemplo'> Página de Exemplo (Clique aqui) </Link> </p>
            <FormularioCadastroUser/>
            <Footer/>
        </div>
    );
}

export default Home;