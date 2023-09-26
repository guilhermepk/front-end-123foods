import './Footer.css';
import {ImFacebook2} from 'react-icons/im';
import {ImLinkedin} from 'react-icons/im';
import {BsInstagram} from 'react-icons/bs';

function Footer(){
    return(
        <footer className="container">
            <div className=''>
                <section className='grid-footer'>
                <li>
                <ul className="primeiro">
                    <h2 className='titulos'>Atendimento ao Cliente</h2>
                    <a href="/Howtobuy" className="footer-link1">Como comprar?</a>
                    <a href="/ProblemswithDelivery" className="footer-link">Problemas com Entrega</a>
                    <a href="/Orders" className="footer-link">Pedidos, Cancelamento, Trocas e Devoluções</a>
                </ul>
                <ul className="primeiro">
                    <h2 className='titulos'>Conheça-nos</h2>
                    <a href="/Ourhistory" className="footer-link2">Nossa História</a>
                    <a href="/Ourstore" className="footer-link3">Nossa Loja</a>
                    <a href="/Team" className="footer-link4">Conheça a Nossa Equipe</a>
                </ul>
                <ul className="primeiro">
                    <h2 className='titulos'>Contato</h2>
                    <a href="gmail.com" className="footer-link4">faleconosco @123foods.com</a>
                    <a href="/WorkwithUs" className="footer-link5">Trabalhe Conosco</a>
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
                    <a className="footer-cash"href="/methods_of_payment" >
                        <img className='img-cash' src="/imagens/icons.png"></img>
                    </a>
                </ul>
                </div>
                <div>
                <ul className="primeiro">
                    <h2 className='titulos'>Siga-nos nas redes sociais</h2>
                   <div className="div-linkedin">
                    <a className="click-linkedin" href="https://br.linkedin.com/company/pormade"> 
                    <ImLinkedin className="linkedin-cor" />
                    </a>
                   </div>
                    <div className="div-insta">
                    <a className="click-insta" href="https://www.instagram.com/pormadeoficial/">
                        <BsInstagram className="instagram-cor" />
                    </a>
                    </div>
                    <div className="div-face">
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