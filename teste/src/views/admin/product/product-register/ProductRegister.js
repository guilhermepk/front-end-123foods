import FormularioProdutos from '../../../../componentes/FormularioProdutos/FormularioProdutos';
import { Link } from "react-router-dom";

const ProductRegister = () => {
    return (
        <div>
            <Link to="/admin"> Admin Home</Link>
            <FormularioProdutos/>
        </div>
    );
}

export default ProductRegister;