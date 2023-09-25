import Footer from "../../componentes/Footer/Footer"
import Navigationbar from '../../componentes/ComponentsofNavbar/Navigationbar/Navigationbar';
import {TbPhotoHeart} from 'react-icons/tb';
import './Team.css'

const Team = () =>{
    return(
        <div>
            <header><Navigationbar/></header>
        <div className="Team-title">
        <h1>Conheça o Nosso Time</h1>
        </div>
        <div className="Team-subtiltle">
        <u>Front-end</u>
        <u>Back-end</u>
        <u>Design</u>
        </div>
        <div className="front-end">
        <div className="front-end-title">
        <TbPhotoHeart/>
            <p>
                Front-end
            </p>
            </div>
            <div className="front-end-content">
                <div className="front-end-div">
                <img className="front-end-img" src="imagens/gabriel.jpeg" />
                </div>
            <div className="front-end-subtitle">
                <p className="front-end-nome">Gabriel Taschner</p>
                <p>Front-end</p>
                <p>Designer</p>
                <hr className="sss" width="80%" color="grey"/>
                </div>
            </div>
        </div>
        <Footer />
        </div>
        
    )
}

export default Team;