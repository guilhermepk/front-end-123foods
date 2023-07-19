import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Home from './views/Home';
import PaginaExemplo from './views/PaginaExemplo';

const App = () => {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/pagina-exemplo' element={<PaginaExemplo/>}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;