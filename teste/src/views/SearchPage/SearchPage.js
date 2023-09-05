import { useParams } from "react-router-dom";
import Footer from "../../componentes/Footer/Footer";
import Navigationbar from '../../componentes/Navigationbar/Navigationbar';
import { useEffect, useState } from "react";

const SearchPage = () => {
    const { searchValue } = useParams();

    const [products, setProducts] = useState();

    useEffect(() => {
        
    });

    return(
        <div>
            <header><Navigationbar/></header>
                <div>
                    {searchValue}
                </div>
                <div>
                    <Footer/>
                </div>
        </div>
    );
}

export default SearchPage;