import Footer from "../../componentes/Footer/Footer"
import Navigationbar from '../../componentes/ComponentsofNavbar/Navigationbar/Navigationbar';
import {TbPhotoHeart} from 'react-icons/tb';
import {BsTwitch} from 'react-icons/bs';
import {BsInstagram} from 'react-icons/bs';
import {BsGithub} from 'react-icons/bs'
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
        <div className="front-end-title">
        <TbPhotoHeart/>
            <p className="label-front-end">
                Front-end
            </p>
            </div>
        <div className="front-end">
            <div className="front-end-card">
                <div className="front-end-div">
                <img className="front-end-img" src="imagens/gabriel.jpeg" />
                </div>
            <div className="front-end-subtitle">
                <p className="front-end-nome">Gabriel Taschner</p>
                <p>Front-end</p>
                <p>Designer</p>
                <hr className="front-end-line" width="80%" color="grey"/>
                <div className="front-end-icons">
                    <a href="https://www.twitch.tv/ztaschner"><BsTwitch /></a>
                    <a className="twitch" href="https://github.com/zTaschner"><BsGithub /></a>
                    <a href="https://www.instagram.com/gabriel_taschner/"><BsInstagram/></a>
                </div>
                </div>
            </div>
            <div className="front-end-card2">
            <div className="front-end-div">
                <img className="front-end-img" src="https://avatars.githubusercontent.com/u/118612780?v=4" />
                </div>
                <div className="front-end-subtitle">
                <p className="front-end-nome">Manu Vodiane</p>
                <p>Front-end</p>
                <p>Designer</p>
                <hr className="front-end-line" width="80%" color="grey"/>
                <div className="front-end-icons">
                    <a className="twitch" href="https://github.com/ManuVodi"><BsGithub /></a>
                    <a href="https://www.instagram.com/manu_vodi/"><BsInstagram/></a>
                </div>
                </div>
            </div>            
        </div>
        <div className="front-end2">
        <div className="front-end-card3">
        
            </div>
            <div className="front-end-card3">
        
            </div> 
            </div>
        <Footer />
        </div>
        
    )
}

export default Team;