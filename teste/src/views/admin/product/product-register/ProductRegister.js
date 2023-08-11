import FormularioProdutos from '../../../../componentes/FormularioProdutos/FormularioProdutos';
import { Link } from "react-router-dom";

const ProductRegister = () => {
    return (
        <div>
            <Link to="/admin"> Admin Home</Link>
            <h1> Cadastrar produtos </h1>
            <FormularioProdutos/>
        </div>
    );
}

export default ProductRegister;