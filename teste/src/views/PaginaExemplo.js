import { Link } from "react-router-dom";
import Navbar from "../componentes/Navbar/Navbar";

const PaginaExemplo = () => {
    return (
        <div>
            <Navbar/>
            <h1> Página de Exemplo </h1>
            <p> <Link to='/'> Página Inicial </Link> </p>
        </div>
    );
}

export default PaginaExemplo;