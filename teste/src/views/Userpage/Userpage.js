import Navigationbar from '../../componentes/Navigationbar/Navigationbar';
import Userpage from '../../componentes/Userpage/Userpage';
import { Link } from "react-router-dom";
import Footer from '../../componentes/Footer/Footer'

const UserPage = () => {
    return (
        <div>
            <header> <Navigationbar/></header>
                <div>
                    <Userpage/>
                </div>
                <div>
                    <Footer />
                </div>
        </div>
    );
}

export default UserPage;