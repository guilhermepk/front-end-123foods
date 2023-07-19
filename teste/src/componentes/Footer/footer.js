import './footer.css';

function Footer(){
    return(
        <footer>
            <div className="container">
                <li>
                <ul className="primeiro">
                    <h2>Atendimento ao Cliente</h2>
                    <a className="footer-link">Como comprar?</a>
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
                    <h2>Pagamento</h2>
                </ul>
                
                <ul className="primeiro">
                    <h2>Siga-nos nas redes sociais</h2>
                </ul>
                </li>
            </div>
        </footer>
    )
}

export default Footer;