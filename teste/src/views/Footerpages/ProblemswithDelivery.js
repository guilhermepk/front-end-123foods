import './ProblemswithDelivery.css'
import Footer from "../../componentes/Footer/Footer"
import Navigationbar from '../../componentes/ComponentsofNavbar/Navigationbar/Navigationbar';
const ProblemswithDelivery= () => {


    return (
        <div>
            <header><Navigationbar/></header>
            <div className="product-help">
      <div className="product-help-title">
      <h2>Problemas com a Entrega?</h2>
      </div>
      <div className="pruduct-help-subtitle">
      <p>
        O prazo de entrega leva geralmente de 50 minutos a 2 horas dependendo do seu endereço
      </p>
      </div>
      <div className="problems-div">
      <img className="problems-img" src="https://cdn.create.vista.com/api/media/medium/208063164/stock-photo-smiling-delivery-man-holding-cardboard-box-checking-wristwatch-isolated-white?token="/>
      </div>
      <div className="problems-content">
      <p>
        Caso o produto não chegar na sua casa consulte a página Pedidos, Cancelamento, Trocas, e Devoluções
      </p>
      </div>
      <p>
        
      </p>
      
    </div>
            <Footer />
        </div>
    );
}

export default ProblemswithDelivery;