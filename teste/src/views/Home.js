import { Link } from "react-router-dom";
import Navbar from '../componentes/Navbar/Navbar';
import Banner from '../componentes/Banner/Banner';
import Filtrocat from '../componentes/Filtrocategorias/filtrocategorias';
import Footer from '../componentes/Footer/Footer';
import HomeProductLister from '../componentes/HomeProductLister/HomeProductLister'

const Home = () => {
    return (
        <div>
            <Navbar/>
            <Link to="/view-teste">ViewTeste</Link>
            <Banner/>
            <Filtrocat/>
            <HomeProductLister/>
            <Footer/>
        </div>
    );
}

export default Home;