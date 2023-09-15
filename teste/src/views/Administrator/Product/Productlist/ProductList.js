import './ProductList.css';

import AdmProductLister from '../../../../componentes/Adm/AdmProductLister/AdmProductLister';
import NavigationbarAdm from '../../../../componentes/Adm/NavigationbarAdm/NavigationbarAdm';

const Productlist = () => {
    return (
        <div>
            <NavigationbarAdm />

            <div className='adm-product-list'>
                <h1 className='h1-products'> Produtos </h1>
                <div className='adm-product-lister'> <AdmProductLister className='adm-products'/> </div>
            </div>
        </div>
    );
}

export default Productlist;