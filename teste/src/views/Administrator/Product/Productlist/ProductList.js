import './ProductList.css';

import AdmProductLister from '../../../../componentes/AdmProductLister/AdmProductLister';
import NavigationbarAdm from '../../../../componentes/NavigationbarAdm/NavigationbarAdm';

const Productlist = () => {
    return (
        <>
            <NavigationbarAdm />

            <h1 className='h1-products'> Produtos </h1>
            <div className='teste'> <AdmProductLister className='products'/> </div>
        </>
    );
}

export default Productlist;