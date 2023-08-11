import ProductLister from '../../../../componentes/ProductLister/ProductLister';
import { Link } from "react-router-dom";

const ProductRegister = () => {
    return (
        <div>
            <Link to="/admin"> Admin Home</Link>
            <h1> Produtos </h1>
            <ProductLister/>
        </div>
    );
}

export default ProductRegister;