import './Orders.css'
import Footer from "../../componentes/Footer/Footer"
import Navigationbar from '../../componentes/ComponentsofNavbar/Navigationbar/Navigationbar';

const Orders= () => {


    return (
        <div>
            <header><Navigationbar/></header>
            <div className="Orders">
              <div className="Orders-title">
      <h2>Pedidos, Cancelamento, Trocas e Devoluções</h2>
      </div>
      <div className="Orders-content">
      <p>
            
      </p>
      </div>
      <div className="trocas-div">
      <img className="img-trocas" src="https://cdn.shoppub.io/vicerinne/media/uploads_editor/2022/09/16/trocas-banner.jpg"/>
      </div>
    </div>
            <Footer />
        </div>
    );
}

export default Orders;