import Footer from "../../componentes/Footer/Footer"
import Navigationbar from '../../componentes/ComponentsofNavbar/Navigationbar/Navigationbar';
import {TbPhotoHeart} from 'react-icons/tb';
import {BsTwitch} from 'react-icons/bs';
import {BsInstagram} from 'react-icons/bs';
import {BsGithub} from 'react-icons/bs';
import {RiComputerLine} from 'react-icons/ri';
import {TbPointerHeart} from 'react-icons/tb';
import {FiFigma} from 'react-icons/fi';
import {BsLinkedin} from 'react-icons/bs'
import './Team.css'
import { TEAMS } from "../../mocks/view/team.js";

const Team = () =>{
    return(
        <div>
            <header><Navigationbar/></header>
        <div className="Team-title">
        <h1>Conheça o Nosso Time</h1>
        </div>
        <div className="Team-subtiltle">
        <u className="design-title">Design</u>
        <u className="front-title">Front-end</u>
        <u className="back-title">Back-end</u>
        </div>
        <div className="front-end-title">
            <TbPointerHeart/>
            <h3>
                Design
            </h3>
        </div>
        <div className="design">
        {
            TEAMS.designer.map((item) => (
                <div className="team-card">
                    <div className="front-end-div">
                    <img className="front-end-img" src={item.foto} />
                    </div>
                    <div className="front-end-subtitle">
                        <p className="front-end-nome">{item.nome}</p>
                        {item.cargo.map(cargo => (
                            <p>{cargo}</p>
                        ))}
                        <hr className="front-end-line" width="80%" color="grey"/>
                        <div className="front-end-icons">
                            {item.socialMidia.map(social => (
                                <a href={social.link} target="blank"><social.icon /></a>
                            ))}
                        </div>
                    </div>
                </div>
            ))
        }
        </div>
        <div className="front-end-title">
        <TbPhotoHeart/>
            <p className="label-front-end">
                Front-end
            </p>
            </div>
        <div className="front-end">
            <div className="team-card">
                <div className="front-end-div">
                <img className="front-end-img" src="imagens/gabriel.jpeg" />
                </div>
            <div className="front-end-subtitle">
                <p className="front-end-nome">Gabriel Taschner Eddine</p>
                <p>Front-end</p>
                <p>Designer</p>
                <hr className="front-end-line" width="80%" color="grey"/>
                <div className="front-end-icons">
                    <a target="blank" href="https://www.twitch.tv/ztaschner"><BsTwitch /></a>
                    <a target="blank" className="twitch" href="https://github.com/zTaschner"><BsGithub /></a>
                    <a target="blank" href="https://www.instagram.com/gabriel_taschner/"><BsInstagram/></a>
                </div>
                </div>
            </div>
            <div className="team-card2">
            <div className="front-end-div">
            <div className="front-end-div">
                <img className="front-end-img" src="/imagens/manu.jpeg" />
                </div>
                </div>
                <div className="front-end-subtitle">
                <p className="front-end-nome">Emanuelle Vodiani</p>
                <p>Front-end</p>
                <p>Designer</p>
                <hr className="front-end-line" width="80%" color="grey"/>
                <div className="front-end-icons">
                    <a target="blank" href="https://github.com/ManuVodi"><BsGithub /></a>
                    <a target="blank" className="twitch" href="https://www.linkedin.com/in/emanuelle-vodiani-272280291/"><BsLinkedin/></a>
                    <a target="blank" href="https://www.instagram.com/manu_vodi/"><BsInstagram/></a>
                </div>
                </div>
            </div>            
        </div>
        <div className="front-end2">
        <div className="team-card3">
        <div className="front-end-div">
            <div className="front-end-div">
                <img className="front-end-img-gui" src="/imagens/gui.jpeg" />
                </div>
                </div>
                <div className="front-end-subtitle">
                <p className="front-end-nome">Guilherme Prigol Kramer</p>
                <p>Back-end</p>
                <p>Front-end</p>
                <hr className="front-end-line" width="80%" color="grey"/>
                <div className="front-end-icons">
                    <a target="blank" href="https://github.com/guilhermepk"><BsGithub /></a>
                    <a target="blank" className="twitch" href="https://www.linkedin.com/in/guilherme-prigol-kramer-b4a0b6275/"><BsLinkedin/></a>
                    <a target="blank" href="https://www.instagram.com/o_guilherme_la/"><BsInstagram/></a>
                </div>
                </div>
            </div>
            <div className="team-card3">
            <div className="front-end-div">
                <img className="front-end-img" src="/imagens/vini.jpeg"/>
                </div>
                <div className="front-end-subtitle">
                <p className="front-end-nome-vini">Vinicius Gabriel Graupmann Juraszek</p>
                <p>Back-end</p>
                <p>Front-end</p>
                <hr className="front-end-line" width="80%" color="grey"/>
                <div className="front-end-icons">
                    <a target="blank" vhref="https://github.com/viniggj2005"><BsGithub /></a>
                    <a target="blank" className="twitch" href="https://www.linkedin.com/in/vinicius-gabriel-graupmann-juraszek-22a679280/"><BsLinkedin/></a>
                    <a target="blank" href="https://www.instagram.com/vinicius_graupmann/"><BsInstagram/></a>
                </div>
                </div>
            </div> 
            </div>
            <div className="label-back-end">
                <RiComputerLine />
                <p>Back-end</p>
            </div>
            <div className="back-end">
                <div className="team-card4">
            <div className="front-end-div">
                <img className="front-end-img-gui" src="/imagens/gui.jpeg"/>
                </div>
                <div className="front-end-subtitle">
                <p className="front-end-nome">Guilherme Prigol Kramer</p>
                <p>Back-end</p>
                <p>Front-end</p>
                <hr className="front-end-line" width="80%" color="grey"/>
                <div className="front-end-icons">
                    <a target="blank" href="https://github.com/guilhermepk"><BsGithub /></a>
                    <a target="blank" className="twitch" href="https://www.linkedin.com/in/guilherme-prigol-kramer-b4a0b6275/"><BsLinkedin/></a>
                    <a target="blank" href="https://www.instagram.com/o_guilherme_la/"><BsInstagram/></a>
                </div>
                </div>
                </div>
                <div className="team-card4">
            <div className="front-end-div">
                <img className="front-end-img" src="/imagens/vini.jpeg"/>
                </div>
                <div className="front-end-subtitle">
                <p className="front-end-nome-vini">Vinicius Gabriel Graupmann Juraszek</p>
                <p>Back-end</p>
                <p>Front-end</p>
                <hr className="front-end-line" width="80%" color="grey"/>
                <div className="front-end-icons">
                    <a target="blank" href="https://github.com/viniggj2005"><BsGithub /></a>
                    <a target="blank" className="twitch" href="https://www.linkedin.com/in/vinicius-gabriel-graupmann-juraszek-22a679280/"><BsLinkedin/></a>
                    <a target="blank" href="https://www.instagram.com/vinicius_graupmann/"><BsInstagram/></a>
                </div>
                </div>
            </div> 
            </div>
            <div></div>
            <div className="figma">
                <p>Veja nosso o projeto base</p>
            <a href="https://www.figma.com/proto/5BkUoGKTSGbkcWKdGgpeV8/123Foods?node-id=1-5&starting-point-node-id=1%3A5" className="figma-link"><FiFigma/></a>
            </div>
        <Footer />
        </div>
    )
}

export default Team;