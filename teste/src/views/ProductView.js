import { useParams } from "react-router-dom";
import ProductPage from "../componentes/ProductPage/ProductPage";
import Navbar from '../componentes/Navbar/Navbar';

const ProductView = () => {
    const { productId } = useParams();

    return (
        <div>
            <Navbar />
            <ProductPage productId={productId}/>
        </div>
    );
}

export default ProductView;