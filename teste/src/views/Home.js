import { Link } from "react-router-dom";

import Banner from '../componentes/Banner/Banner';
import Filtrocat from '../componentes/Filtrocategorias/filtrocategorias';
import FormularioCadastroUser from '../componentes/Formulariocadastro/formulariocadastro';

const Home = () => {
    return (
        <div>
            <Banner/>
            <Filtrocat/>
            <h1> <Link to='/pagina-exemplo'> Página de Exemplo (Clique aqui) </Link> </h1>
            <FormularioCadastroUser/>
        </div>
    );
}

export default Home;