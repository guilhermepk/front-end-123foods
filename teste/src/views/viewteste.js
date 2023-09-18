
import Cartpage from "../componentes/Cart/Cartpage";
import Footer from "../componentes/Footer/Footer";
import Navigationbar from "../componentes/Navigationbar/Navigationbar"


const Viewteste=()=>{


    return(
        <div>
        <header><Navigationbar/></header>
            <div>
                <Cartpage/>
                <Footer />
            </div>

            
        </div>
    )
}
export default Viewteste;