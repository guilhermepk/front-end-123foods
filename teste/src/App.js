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
import UserPage from "./views/Userpage/Userpage";
import Viewteste from "./views/viewteste";
import SearchPage from "./views/SearchPage/SearchPage";
import ProductEditView from "./views/Administrator/Product/Productlist/ProductEditView/ProductEditView";
import Cartpage from "./componentes/Cart/Cartpage";
import Ourhistory from "./views/Footerpages/Ourhistory";
import HowtoBuy from "./views/Footerpages/HowtoBuy";
import Ourstore from "./views/Footerpages/Ourstore";
import WorkwithUs from "./views/Footerpages/WorkwithUs";
import ProblemswithDelivery from "./views/Footerpages/ProblemswithDelivery";
import Orders from "./views/Footerpages/Orders";
import Payments from "./views/Footerpages/Payments";
import Team from "./views/Footerpages/Team";

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
          {/* Página principal e não encontrada */}
          <Route path="/" element={<Home/>}/>
          <Route path="/teste" element={<Viewteste/>}/>
          <Route path="*" element={<NotFound />} />
          <Route path="/Ourhistory" element={<Ourhistory />} />
          <Route path="/Howtobuy" element={<HowtoBuy />} />
          <Route path="/Ourstore" element={<Ourstore />} />
          <Route path="/WorkwithUs" element={<WorkwithUs />} />
          <Route path="/ProblemswithDelivery" element={<ProblemswithDelivery />} />
          <Route path="/Orders" element={<Orders />} />
          <Route path="/methods_of_payment" element={<Payments />} />
          <Route path="/Team" element={<Team />} />
          
          {/* Páginas relacionadas ao login, infos do user, etc */}
          <Route path="/user-register" element={<Userregister />} />
          <Route path="/user-page" element={<UserPage />} />
          {/* <Route path="/cart" element={<Cartpage/>} /> */}

          {/* Páginas dos produtos */}
          <Route path='/product/:productId' element={<Productview/>} />
          <Route path='/search/:searchValue' element={<SearchPage/>} />

          {/* Páginas do adm */}
          <Route path="/admin" element={Isadmin() ? <Admin /> : <Navigate to="/" />} />
          <Route path="/admin/banner" element={Isadmin() ? <Bannerregister /> : <Navigate to="/" />} />
          <Route path="/admin/bannerlist" element={Isadmin() ? <Bannerlist /> : <Navigate to="/" />} />
          <Route path="/admin/product-register" element={Isadmin() ? <Productregister /> : <Navigate to="/" />} />
          <Route path="/admin/product-list" element={Isadmin() ? <Productlist/> : <Navigate to='/'/>} />
          <Route path="/admin/product-edit/:productId" element={Isadmin() ? <ProductEditView/> : <Navigate to='/'/>} />
          <Route path="/admin/notifications" element={Isadmin() ? <Notification/> : <Navigate to="/" />} />
          <Route path="/admin/notifications/list" element={Isadmin() ? <NotificationlistFront/> : <Navigate to="/" />} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;