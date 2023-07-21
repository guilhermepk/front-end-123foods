import { Link } from "react-router-dom";

const PaginaExemplo = () => {
    return (
        <div>
            <h1> Página de Exemplo </h1>
            <p> <Link to='/'> Página Inicial </Link> </p>
        </div>
    );
}

export default PaginaExemplo;