import { Link } from "react-router-dom";
import Navbar from '../../componentes/Navbar/Navbar';
import Banner from '../../componentes/Banner/Banner';
import Filtrocat from '../../componentes/Filtrocategorias/filtrocategorias';
import Footer from '../../componentes/Footer/Footer';
import HomeProductLister from '../../componentes/HomeProductLister/HomeProductLister'

import './Home.css'

const Home = () => {
    return (
        <div>
            <Navbar/>
            <div className="products">
                <Banner/>
                <Filtrocat/>
                <HomeProductLister/>
            </div>
            <Footer/>
        </div>
    );
}

export default Home;