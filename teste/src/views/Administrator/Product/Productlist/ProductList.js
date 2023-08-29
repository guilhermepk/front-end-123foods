import Productlister from '../../../../componentes/Productlister/Productlister';
import { Link } from "react-router-dom";
import NavigationbarAdm from '../../../../componentes/NavigationbarAdm/NavigationbarAdm';

const Productlist = () => {
    return (
        <div>
            <NavigationbarAdm />
            <Link to="/admin"> Admin Home</Link>
            <h1> Produtos </h1>
            <Productlister/>
        </div>
    );
}

export default Productlist;