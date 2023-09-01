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
                    <a className="footer-link">Como comprar?</a>
                    <a className="footer-link">Problemas com Entrega</a>
                    <a className="footer-link">Pedidos, Cancelamento, Trocas e Devoluções</a>
                    <a className="footer-link">Problemas com Entrega</a>
                </ul>
                <ul className="primeiro">
                    <h2 className='titulos'>Conheça-nos</h2>
                    <a className="footer-link">Nossa História</a>
                    <a className="footer-link">Nossa Loja</a>
                </ul>
                <ul className="primeiro">
                    <h2 className='titulos'>Contato</h2>
                    <a className="footer-link">faleconosco @123foods.com</a>
                    <a className="footer-link">Trabalhe Conosco</a>
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
                    <a className="footer-cash">
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