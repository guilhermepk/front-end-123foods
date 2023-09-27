import './Orders.css'
import Footer from "../../componentes/Footer/Footer"
import Navigationbar from '../../componentes/ComponentsofNavbar/Navigationbar/Navigationbar';

const Orders= () => {


    return (
        <div>
            <header><Navigationbar/></header>
            <div className="Orders">
              <div className="Orders-title">
      <h1>Pedidos, Cancelamento, Trocas e Devoluções</h1>
      </div>
      <div className="Orders-content">
      <p>
            
      </p>
      </div>
      <div className="trocas-div">
      <img className="img-trocas" src="https://cdn.awsli.com.br/1664/1664225/arquivos/Img_Politica%20Ressarcimento%20de%20valores_1.png"/>
      </div>
    </div>
            <Footer />
        </div>
    );
}

export default Orders;