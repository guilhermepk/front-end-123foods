import Productlister from '../../../../componentes/Productlister/Productlister';
import { Link } from "react-router-dom";

const Productlist = () => {
    return (
        <div>
            <Link to="/admin"> Admin Home</Link>
            <h1> Produtos </h1>
            <Productlister/>
        </div>
    );
}

export default Productlist;