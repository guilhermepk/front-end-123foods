import { useParams } from "react-router-dom";
import Footer from "../../componentes/Footer/Footer";
import Navigationbar from '../../componentes/ComponentsofNavbar/Navigationbar/Navigationbar';
import SearchList from "../../componentes/Searchs/SearchList/SearchList";


const SearchPage = () => {
    const { searchValue } = useParams();

    

    return(
        <div>
            <Navigationbar/>

            <h1 style={{marginLeft:'100px'}}> Sua busca: {searchValue} </h1>

            <SearchList searchValue={searchValue} />

            <Footer/>
        </div>
    );
}

export default SearchPage;