import ProductEdit from '../../../../../componentes/Adm/AdmProductLister/ProductEdit/ProductEdit';
import './ProductEditView.css'

import { useParams } from "react-router-dom";

const ProductEditView = () => {
    const { productId } = useParams();

    return(
        <div>
            <h1 className="h1-edt-product"> Edição de produtos cadastrados </h1>
            <div className='table-product-edt'>
                <ProductEdit productId={productId} />
            </div>
        </div>
    );
}

export default ProductEditView;