import './WorkwithUs.css'
import Footer from "../../componentes/Footer/Footer"
import Navigationbar from '../../componentes/ComponentsofNavbar/Navigationbar/Navigationbar';
const WorkwithUs= () => {


    return (
        <div className="Workwithus">
            <header><Navigationbar/></header>
            <div>
      <div className="work-title">
        <h2>Trabalhe conosco</h2>
      </div>
      <img src="/imagens/timefoda.jpeg"/>
    </div>
            <Footer />
        </div>
    );
}

export default WorkwithUs;