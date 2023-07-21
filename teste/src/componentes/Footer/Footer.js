import './Footer.css';
import {MdPix} from 'react-icons/md';
import {FaCcMastercard} from 'react-icons/fa';
import {FaCcVisa} from 'react-icons/fa';
import {FaRegCreditCard} from 'react-icons/fa'

function Footer(){
    return(
        <footer className="container">
            <div className=''>
                <section className='grid-footer'>
                <li>
                <ul className="primeiro">
                    <h2>Atendimento ao Cliente</h2>
                    <a className="footer-link">Como comprar?</a>
                    <a className="footer-link">Problemas com Entrega</a>
                    <a className="footer-link">Pedidos, Cancelamento, Trocas e Devoluções</a>
                    <a className="footer-link">Problemas com Entrega</a>
                    <a className="footer-link">Pedidos, Cancelamento, Trocas e Devoluções</a>
                </ul>
                <ul className="primeiro">
                    <h2>Conheça-nos</h2>
                    <a className="footer-link">Nossa História</a>
                    <a className="footer-link">Nossa Loja</a>
                </ul>

                <ul className="primeiro">
                    <h2>Contato</h2>
                    <a className="footer-link">faleconosco@123foods.com</a>
                    <a className="footer-link">Trabalhe Conosco</a>
                </ul>

                <ul className="primeiro">
                    <div className="pagamento">
                    <h2>Pagamento</h2>
                        <a className="footer-cash">
                        <MdPix className="pix"/>
                        </a>
                    <a className="footer-cash">
                        <FaCcMastercard className="mastercard"/>
                        </a>
                    <a className="footer-cash">
                        <FaCcVisa className="visa"/>
                        </a>
                        <a className="footer-cash">
                        <FaRegCreditCard className="cartao"/>
                        </a>
                    </div>
                </ul>
                
                <ul className="primeiro">
                    <h2>Siga-nos nas redes sociais</h2>
                </ul>
                </li>
                </section>
            </div>
        </footer>
    )
}

export default Footer;