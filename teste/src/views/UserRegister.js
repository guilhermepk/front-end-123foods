import FormularioCadastroUser from '../componentes/Formulariocadastro/formulariocadastro';
import { Link } from "react-router-dom";

const UserRegister = () => {
    return (
        <div>
            <h1> Cadastre-se! </h1>
            <FormularioCadastroUser/>
            <br/><br/><br/>
            <h2> <Link to='/'> Página Inicial </Link> </h2>
            <br/><br/><br/>
        </div>
    );
}

export default UserRegister;