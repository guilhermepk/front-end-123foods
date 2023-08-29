import { useParams } from "react-router-dom";
import Productpage from "../../componentes/Productpage/Productpage";
import Navigationbar from '../../componentes/Navigationbar/Navigationbar';

const Productview = () => {
    const { productId } = useParams();

    return (
        <div className="ProductView-main">
            <Navigationbar />
            <Productpage productId={productId}/>
        </div>
    );
}

export default Productview;