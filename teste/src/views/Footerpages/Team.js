import Footer from "../../componentes/Footer/Footer"
import Navigationbar from '../../componentes/ComponentsofNavbar/Navigationbar/Navigationbar';
import {TbPhotoHeart} from 'react-icons/tb';
import {BsTwitch} from 'react-icons/bs';
import {BsInstagram} from 'react-icons/bs';
import {BsGithub} from 'react-icons/bs'
import {RiComputerLine} from 'react-icons/ri'
import './Team.css'

const Team = () =>{
    return(
        <div>
            <header><Navigationbar/></header>
        <div className="Team-title">
        <h1>Conheça o Nosso Time</h1>
        </div>
        <div className="Team-subtiltle">
        <u className="front-title">Front-end</u>
        <u className="back-title">Back-end</u>
        <u className="design-title">Design</u>
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
                <p className="front-end-nome">Gabriel Taschner Eddine</p>
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
            <div className="front-end-div">
                <img className="front-end-img" src="https://avatars.githubusercontent.com/u/118612780?v=4" />
                </div>
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
        <div className="front-end-div">
            <div className="front-end-div">
                <img className="front-end-img" src="https://avatars.githubusercontent.com/u/112448450?v=4" />
                </div>
                </div>
                <div className="front-end-subtitle">
                <p className="front-end-nome">Guilherme Prigol</p>
                <p>Back-end</p>
                <p>Front-end</p>
                <hr className="front-end-line" width="80%" color="grey"/>
                <div className="front-end-icons">
                    <a className="twitch" href="https://github.com/guilhermepk"><BsGithub /></a>
                    <a href="https://www.instagram.com/o_guilherme_la/"><BsInstagram/></a>
                </div>
                </div>
            </div>
            <div className="front-end-card3">
            <div className="front-end-div">
                <img className="front-end-img" src="https://avatars.githubusercontent.com/u/102488557?v=4"/>
                </div>
                <div className="front-end-subtitle">
                <p className="front-end-nome">Vinicius Gabriel Graupmann</p>
                <p>Back-end</p>
                <p>Front-end</p>
                <hr className="front-end-line" width="80%" color="grey"/>
                <div className="front-end-icons">
                    <a className="twitch" href="https://github.com/viniggj2005"><BsGithub /></a>
                    <a href="https://www.instagram.com/vinicius_graupmann/"><BsInstagram/></a>
                </div>
                </div>
            </div> 
            </div>
            <div className="label-back-end">
                <RiComputerLine />
                <p>Back-end</p>
                
            </div>
            <div className="back-end">
                <div className="front-end-card4">
            <div className="front-end-div">
                <img className="front-end-img" src="https://avatars.githubusercontent.com/u/112448450?v=4"/>
                </div>
                <div className="front-end-subtitle">
                <p className="front-end-nome">Guilherme Prigol</p>
                <p>Back-end</p>
                <p>Front-end</p>
                <hr className="front-end-line" width="80%" color="grey"/>
                <div className="front-end-icons">
                    <a className="twitch" href="https://github.com/guilhermepk"><BsGithub /></a>
                    <a href="https://www.instagram.com/o_guilherme_la/"><BsInstagram/></a>
                </div>
                </div>
                </div>
                <div className="front-end-card4">
            <div className="front-end-div">
                <img className="front-end-img" src="https://avatars.githubusercontent.com/u/102488557?v=4"/>
                </div>
                <div className="front-end-subtitle">
                <p className="front-end-nome">Vinicius Gabriel Graupmann</p>
                <p>Back-end</p>
                <p>Front-end</p>
                <hr className="front-end-line" width="80%" color="grey"/>
                <div className="front-end-icons">
                    <a className="twitch" href="https://github.com/viniggj2005"><BsGithub /></a>
                    <a href="https://www.instagram.com/vinicius_graupmann/"><BsInstagram/></a>
                </div>
                </div>
            </div> 
            </div>
        <Footer />
        </div>
        
    )
}

export default Team;