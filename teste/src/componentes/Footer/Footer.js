import './Footer.css';
import {ImFacebook2} from 'react-icons/im';
import {ImLinkedin} from 'react-icons/im';
import {BsInstagram} from 'react-icons/bs';
import { Link } from "react-router-dom";
function Footer(){
    
    
    return(
        <footer className="container">
            <div className=''>
                <section className='grid-footer'>
                <li>
                <ul className="primeiro">
                    <h2 className='titulos'>Atendimento ao Cliente</h2>
                    <Link to={`/Howtobuy`} className="footer-link1"><p>Como&nbsp;comprar?</p></Link>
                    <Link to={`/ProblemswithDelivery`} className="footer-link1"><p>Problemas&nbsp;com&nbsp;Entrega</p></Link>
                    <Link to={`/Orders`} className="footer-link1"><p>Pedidos,&nbsp;Cancelamento,&nbsp;Trocas&nbsp;e&nbsp;Devoluções</p></Link>
                </ul>
                <ul className="primeiro">
                    <h2 className='titulos'>Conheça-nos</h2>
                    <Link to={`/Ourhistory`} className="footer-link2"><p>Nossa&nbsp;História</p></Link>
                    <Link to={`/Team`} className="footer-link4"><p>Conheça&nbsp;a&nbsp;Nossa&nbsp;Equipe</p></Link>
                </ul>
                <ul className="primeiro">
                    <h2 className='titulos'>Contato</h2>
                    <Link to={`gmail.com`} className="footer-link4"><p>faleconosco&nbsp;@123foods.com</p></Link>
                    <Link to={`/WorkwithUs`} className="footer-link5"><p>Trabalhe&nbsp;Conosco</p></Link>
                </ul>
                <div className="apagar">
                <ul className="primeiro">
                    <h2 className='titulos'></h2>
                    <a className="footer-link"></a>
                    <a className="footer-link"></a>
                </ul>
                </div>
                <div className="pagamento">
                <ul className="primeiro">
                    <h2 className='titulos'>Pagamento</h2>
                    <Link to={`//methods_of_payment`} className="footer-cash"><img className='img-cash' src="/imagens/icons.png"></img>             
                    </Link>
                </ul>
                </div>
                <div>
                <ul className="primeiro">
                    <h2 className='titulos'>Siga-nos nas redes sociais</h2>
                   <div className="div-icons">
                    <a className="click-linkedin" href="https://br.linkedin.com/company/pormade"> 
                    <ImLinkedin className="linkedin-cor" />
                    </a>
                    <a className="click-insta" href="https://www.instagram.com/pormadeoficial/">
                        <BsInstagram className="instagram-cor" />
                    </a>
                    <a className="click-facebook" href="https://www.facebook.com/pormadeonline/?locale=pt_BR">
                    <ImFacebook2 className="face-cor" />
                    </a>
                    </div>
                </ul>
                </div>
                </li>
                </section>
            </div>
        </footer>
    )
}

export default Footer;