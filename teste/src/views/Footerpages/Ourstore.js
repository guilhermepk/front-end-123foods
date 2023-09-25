import './Ourstore.css'
import Footer from "../../componentes/Footer/Footer"

import Navigationbar from '../../componentes/ComponentsofNavbar/Navigationbar/Navigationbar';

const Ourstore = () => {


    return (
        <div className="Our-store">
            <header><Navigationbar/></header>
            <div className="nossa-loja">
      <div className="ourstory-title">
      <h2>Nossa Loja</h2>
      </div>
      <div className="ourstory-content">
      <img className="ourstory-img" src="https://www.northjersey.com/gcdn/presto/2023/03/22/PNJM/8d5c0e0c-725e-41b3-bea9-1271bc234ee3-amazone_fresh.jpg?crop=2015,1134,x0,y0&width=2015&height=1134&format=pjpg&auto=webp"/>
      </div>
    </div>
            <Footer />
        </div>
    );
}

export default Ourstore;