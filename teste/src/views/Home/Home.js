import { Link } from "react-router-dom";
import Navbar from '../../componentes/Navbar/Navbar';
import Banner from '../../componentes/Banner/Banner';
import Filtrocat from '../../componentes/Filtrocategorias/filtrocategorias';
import Footer from '../../componentes/Footer/Footer';

import './Home.css'

const Home = () => {
    return (
        <div className="home-main" >
            <Navbar/>
            <div className="products">
                <Banner/>
                <Filtrocat/>
            </div>
            <Footer/>
        </div>
    );
}

export default Home;