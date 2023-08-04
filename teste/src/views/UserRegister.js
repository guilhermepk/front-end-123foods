import FormularioCadastroUser from '../componentes/Formulariocadastro/formulariocadastro';
import { Link } from "react-router-dom";

const UserRegister = () => {
    return (
        <div>
            <h1> Cadastre-se! </h1>
            <FormularioCadastroUser/>

        </div>
    );
}

export default UserRegister;