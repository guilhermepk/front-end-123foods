import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Home from './views/Home';
import PaginaExemplo from './views/PaginaExemplo';

import Navbar from './componentes/Navbar/Navbar';
import Footer from './componentes/Footer/footer';

const App = () => {
  return (
    <div className="App">
      <Navbar/>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='/pagina-exemplo' element={<PaginaExemplo/>}/>
        </Routes>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;