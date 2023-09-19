import './Home.css'

import Navigationbar from '../../componentes/ComponentsofNavbar/Navigationbar/Navigationbar';
import Banner from '../../componentes/Banner/Banner';
import Footer from '../../componentes/Footer/Footer';
import FilterCategories from'../../componentes/Filtercategories/Filtercategories';

const Home = () => {
    return (
        <div className="home-main" >
            <Navigationbar/>
            <div className="products">
                <Banner/>
                <FilterCategories />
            </div>
            <Footer/>
        </div>
    );
}

export default Home;