import './ProductEditView.css'

import { useParams } from "react-router-dom";

const ProductEditView = () => {
    const { productId } = useParams();

    return(
        <div>
            <h1 className="h1-edt-product"> Edição de produtos cadastrados </h1>
            oi
            {productId}
        </div>
    );
}

export default ProductEditView;