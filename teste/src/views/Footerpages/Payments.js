import './Payments.css';
import Footer from "../../componentes/Footer/Footer";
import Navigationbar from '../../componentes/ComponentsofNavbar/Navigationbar/Navigationbar';

const Payments= () => {

    return (
        <div className="Payments">
            <header><Navigationbar/></header>
            <div>
      <div className="pay-title">
      <h1>Métodos de Pagamento</h1>
      </div>
      <div className="pay-img-div">
      <img className="pay-img" src="https://www.mmnweb.com/wp-content/uploads/2020/03/pagamentos.jpg"/>
      </div>
    </div>
            <Footer />
        </div>
    );
}

export default Payments;