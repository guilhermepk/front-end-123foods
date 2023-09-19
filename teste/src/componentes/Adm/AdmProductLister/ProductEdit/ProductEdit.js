import Productform from "../../Productform/Productform";

const ProductEdit = (props) => {
    const productId = props.productId
    
    return (
        <>
        <Productform productId={productId}/>
        </>
    );
}

export default ProductEdit;