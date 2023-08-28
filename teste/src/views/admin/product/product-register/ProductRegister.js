import FormularioProdutos from '../../../../componentes/FormularioProdutos/FormularioProdutos';
import { Link } from "react-router-dom";
import NavbarAdm from '../../../../componentes/navbaradm/navbaradm';

const ProductRegister = () => {
    return (
        <div>
            <NavbarAdm></NavbarAdm>
            <FormularioProdutos/>
        </div>
    );
}

export default ProductRegister;