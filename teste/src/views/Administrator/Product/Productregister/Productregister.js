import ProductRegister from '../../../../componentes//Productform/ProductformRegister';
import { Link } from "react-router-dom";
import NavigationbarAdm from '../../../../componentes/NavigationbarAdm/NavigationbarAdm';

const Productregister = () => {
    return (
        <div>
            <NavigationbarAdm/>
            <ProductRegister/>
        </div>
    );
}

export default Productregister;