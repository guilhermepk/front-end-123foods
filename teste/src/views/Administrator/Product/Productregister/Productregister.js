
import { Link } from "react-router-dom";
import NavigationbarAdm from '../../../../componentes/Adm/NavigationbarAdm/NavigationbarAdm';
import Productform from '../../../../componentes/Adm/Productform/Productform';

const Productregister = () => {
    return (
        <div>
            <NavigationbarAdm/>
            <h1 className="cadastro-texto"> Cadastrar produtos </h1> 
            <Productform/>
        </div>
    );
}

export default Productregister;