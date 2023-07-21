import {
  BrowserRouter as Router,
  Routes,
  Route,Navigate
} from "react-router-dom";
import Home from './views/Home';
import PaginaExemplo from './views/PaginaExemplo';
import Admin from './views/admin/Admin';
import UserRegister from './views/UserRegister';
import ProductRegister from './views/admin/ProductRegister';
import Footer from "./componentes/Footer/Footer";
import isAdmin from './views/admin/AdminRouteGuard'

function NotFound() {
  return (
    <div>
      <br/><br/><br/><br/><br/><br/>
      <br/><br/><br/><br/><br/><br/>
      <br/><br/><br/><br/><br/><br/>
      <h1>Página não encontrada!</h1>
    </div>
  );
}

const App = () => {
  
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Tem que tratar as rotas desconhecidas ainda */}
          <Route path="/" element={<Home/>}/>
          <Route path="*" element={<NotFound />} />
          <Route path='/pagina-exemplo' element={<PaginaExemplo/>}/>
          <Route path="/user-register" element={<UserRegister />} />
          <Route path="/admin/product-register" element={isAdmin() ? <ProductRegister /> : <Navigate to="/" />} />
          <Route path="/admin" element={isAdmin() ? <Admin /> : <Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;