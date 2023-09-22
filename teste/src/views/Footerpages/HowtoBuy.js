import Footer from "../../componentes/Footer/Footer"
import './HowtoBuy.css';
import Navigationbar from '../../componentes/ComponentsofNavbar/Navigationbar/Navigationbar';
const HowtoBuy = () => {


    return (
        <div className="How-to-Buy">
            <header><Navigationbar/></header>
            <div className="buy-title">
      <h2>Como Comprar</h2>
      </div>
      <div className="Howtobuy-sub-title">
      <p>
        Nosso site possui vários produtos
      </p>
      </div>
      <div className="howtobuy-info">
      <p>
      Para compra-los é muito fácil, caso queira visualizar alguns de nossos produtos basta clicar no mesmo
      </p>
      <img src="imagens/Captura de tela de 2023-09-22 08-39-42.png" className="img-howtobuy"></img>
      </div>
      <div className="howtobuy-info2">
      <p>
      Caso esteja procurando por algum produto em espećifico a barra de pesquisa e as categorias de produto estão na página principal so site
      </p>
      <img src="imagens/Captura de tela de 2023-09-22 08-48-30.png" className="img-howtobuy-info"></img>
      <img src="imagens/Captura de tela de 2023-09-22 08-49-28.png" className="img-howtobuy"></img>
      </div>
      <div className="howtobuy-carrinho">
        <p>
          Depois de escolher o seu produto, clique em comprar e ele irá direto para o carrinho de compras, onde voçê pode finalizar a compra
        </p>
        <img src="imagens/Captura de tela de 2023-09-22 09-03-09.png" className="img-howtobuy-final"></img>
      </div>
      <p>
        
      </p>
            <Footer />
        </div>
    );
}

export default HowtoBuy;