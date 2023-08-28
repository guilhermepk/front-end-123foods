import {
  BrowserRouter as Router,
  Routes,
  Route,Navigate
} from "react-router-dom";

import Home from './views/Home/Home';
import Admin from './views/admin/Admin';
import UserRegister from './views/UserRegister';
import ProductRegister from './views/admin/product/product-register/ProductRegister';
import ProductList from './views/admin/product/product-list/ProductList';

import isAdmin from './views/admin/AdminRouteGuard'
import BannerCadastro from "./views/admin/banner/cadastrobanner";
import Bannerlist from "./views/admin/banner/bannerlist";
import ProductView from "./views/ProductPages/ProductView";
import Notification from "./views/admin/notification/notification";
import Notificationf from "./views/admin/notification/list_notificationf";

function NotFound() {
  return (
    <div>
      <h1>Página não encontrada!</h1>
    </div>
  );
}

const App = () => {
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="*" element={<NotFound />} />
          <Route path="/user-register" element={<UserRegister />} />
          <Route path="/admin/notifications" element={isAdmin() ? <Notification/> : <Navigate to="/" />} />
          <Route path="/admin/notifications/list" element={isAdmin() ? <Notificationf/> : <Navigate to="/" />} />

          <Route path="/admin" element={isAdmin() ? <Admin /> : <Navigate to="/" />} />
            <Route path="/admin/product-register" element={isAdmin() ? <ProductRegister /> : <Navigate to="/" />} />
            <Route path="/admin/banner" element={isAdmin() ? <BannerCadastro /> : <Navigate to="/" />} />
            <Route path="/admin/bannerlist" element={isAdmin() ? <Bannerlist /> : <Navigate to="/" />} />
            <Route path="/admin/product-list" element={isAdmin() ? <ProductList/> : <Navigate to='/'/>} />

          <Route path='/product/:productId' element={<ProductView/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;