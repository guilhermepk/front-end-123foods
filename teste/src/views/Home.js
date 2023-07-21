import { Link } from "react-router-dom";
import Navbar from '../componentes/Navbar/Navbar';
import Banner from '../componentes/Banner/Banner';
import Filtrocat from '../componentes/Filtrocategorias/filtrocategorias';
import Footer from '../componentes/Footer/Footer';

const Home = () => {
    return (
        <div>
            <Navbar/>
            <Banner/>
            <Filtrocat/>
            <Footer/>
        </div>
    );
}

export default Home;