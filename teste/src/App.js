import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Home from './views/Home';
import PaginaExemplo from './views/PaginaExemplo';
import Admin from './views/admin/Admin';
import UserRegister from './views/UserRegister';
import ProductRegister from './views/admin/ProductRegister';
import Footer from "./componentes/Footer/Footer";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Tem que tratar as rotas desconhecidas ainda */}
          <Route path="/" element={<Home/>}/>
          <Route path='/pagina-exemplo' element={<PaginaExemplo/>}/>
          <Route path='/admin' element={<Admin/>}/>
          <Route path='/user-register' element={<UserRegister/>}/>
          <Route path='/admin/product-register' element={<ProductRegister/>}/>
        </Routes>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;