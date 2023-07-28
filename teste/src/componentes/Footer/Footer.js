import './Footer.css';
import {FaSquareFacebook} from 'react-icons/fa';

function Footer(){
    return(
        <footer className="container">
            <div className=''>
                <section className='grid-footer'>
                <li>
                <div>
                <ul className="primeiro">
                    <h2>Atendimento ao Cliente</h2>
                    <a className="footer-link">Como comprar?</a>
                    <a className="footer-link">Problemas com Entrega</a>
                    <a className="footer-link">Pedidos, Cancelamento, Trocas e Devoluções</a>
                    <a className="footer-link">Problemas com Entrega</a>
                </ul>
                </div>
                <div>
                <ul className="primeiro">
                    <h2>Conheça-nos</h2>
                    <a className="footer-link">Nossa História</a>
                    <a className="footer-link">Nossa Loja</a>
                </ul>
                </div>
                <div>
                <ul className="primeiro">
                    <h2>Contato</h2>
                    <a className="footer-link">faleconosco@123foods.com</a>
                    <a className="footer-link">Trabalhe Conosco</a>
                </ul>
                </div>
                <div className="pagamento">
                <ul className="primeiro">
                    <h2>Pagamento</h2>
                    <a className="footer-cash">
                        <img className='img-cash' src="/imagens/icons.png"></img>
                    </a>
                </ul>
                </div>
                <div className="redes">
                <ul className="primeiro">
                    <h2>Siga-nos nas redes sociais</h2>
                    <a className="click" href=''> 
                        <img src="/imagens/linkedin.png"></img>
                    </a>
                    <a className="click-insta" href="">
                        <img src="/imagens/insta.png"></img>
                    </a>
                    <a className="click" href=''>
                        <img src="/imagens/face.png"></img>
                    </a>
                </ul>
                </div>
                </li>
                </section>
            </div>
        </footer>
    )
}

export default Footer;