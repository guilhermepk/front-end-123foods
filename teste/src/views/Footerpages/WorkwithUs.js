import './WorkwithUs.css'
import ConfettiGenerator from "confetti-js";
import {AiFillHeart} from 'react-icons/ai';
import React from 'react';
import Footer from "../../componentes/Footer/Footer"
import Navigationbar from '../../componentes/ComponentsofNavbar/Navigationbar/Navigationbar';
const WorkwithUs= () => {

  React.useEffect(() => {
    const confettiSettings = { target: 'my-canvas' };
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
  
    return () => confetti.clear();
  }, []) // add the var dependencies or not


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
      <canvas className="confetes" id="my-canvas"></canvas>
      <div className="heart-icon">
        <button  className="heart"><AiFillHeart/></button>
      </div>
    </div>
          <Footer />
        </div>
    );
}

export default WorkwithUs;