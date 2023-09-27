import './WorkwithUs.css'
import {AiFillHeart} from 'react-icons/ai';
import Footer from "../../componentes/Footer/Footer"
import Navigationbar from '../../componentes/ComponentsofNavbar/Navigationbar/Navigationbar';
const WorkwithUs= () => {

    return (
        <div>
            <header><Navigationbar/></header>
            <div>
      <div className="work-title">
        <h1>Trabalhe conosco</h1>
      </div>
      <div className="work-subtitle">
        <p>
          Um agradecimento especial a essa equipe incrível 
        </p>
      </div>
      <div className="time-img-div">
        <img className="time-img" src="imagens/timefoda.jpg"/>
      </div>
      <div className="heart-icon">
        <AiFillHeart/>
      </div>
    </div>
          <Footer />
        </div>
    );
}

export default WorkwithUs;