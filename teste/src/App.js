import {
  BrowserRouter as Router,
  Routes,
  Route,Navigate
} from "react-router-dom";

import Home from './views/Home/Home';
import Admin from './views/Administrator/Admin';
import Userregister from './views/Userregister';
import Productregister from './views/Administrator/Product/Productregister/Productregister';
import Productlist from './views/Administrator/Product/Productlist/ProductList';

import Isadmin from './views/Administrator/AdminrouteGuard'
import Bannerregister from "./views/Administrator/Banner/Bannnerregister";
import Bannerlist from "./views/Administrator/Banner/Bannerlist";
import Productview from "./views/Productpages/Productview";
import Notification from "./views/Administrator/Notification/Notification";
import NotificationlistFront from "./views/Administrator/Notification/NotificationlistFront";
import Userpage from "./views/Userpage/Userpage";
import UserPage from "./views/Userpage/Userpage";

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
          <Route path="/user-register" element={<Userregister />} />
          <Route path="/user-page" element={<UserPage />} />
          <Route path="/admin/notifications" element={Isadmin() ? <Notification/> : <Navigate to="/" />} />
          <Route path="/admin/notifications/list" element={Isadmin() ? <NotificationlistFront/> : <Navigate to="/" />} />

          <Route path="/admin" element={Isadmin() ? <Admin /> : <Navigate to="/" />} />
            <Route path="/admin/product-register" element={Isadmin() ? <Productregister /> : <Navigate to="/" />} />
            <Route path="/admin/banner" element={Isadmin() ? <Bannerregister /> : <Navigate to="/" />} />
            <Route path="/admin/bannerlist" element={Isadmin() ? <Bannerlist /> : <Navigate to="/" />} />
            <Route path="/admin/product-list" element={Isadmin() ? <Productlist/> : <Navigate to='/'/>} />

          <Route path='/product/:productId' element={<Productview/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;