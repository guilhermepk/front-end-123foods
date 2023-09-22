import Footer from "../../componentes/Footer/Footer"
import Navigationbar from '../../componentes/ComponentsofNavbar/Navigationbar/Navigationbar';
import './Ourhistory.css'
const Ourhistory = () => {

    return (
        <div className="Our-history">
            <header><Navigationbar/></header>
            <div className="history-tilte">
      <h2>Nossa História</h2>
      </div>
      <div className="subtitle-history">
      <p>
        Os Porta Pronta
      </p>
      </div>
      <p className="content-history">
        Era uma manhã comum de abril, mais um dia vivendo a vida de desempregado até que fomos contratados pela grande e maravilhosa Pormade Portas, o grupo se conheceu no projeto trainee, alguns já se conheciam antes, mas o que mais nos uniu como time foi a necessidade de surgir os Porta Pronta, desde então estamos trabalhando no projeto 123foods, um e-commerce incrível de supermecado!
      </p>
      <div className="img-history">
      <img src="imagens/pormade.webp" className="img-pormade"></img>
      </div>
            <Footer />
        </div>
    );
}
export default Ourhistory;