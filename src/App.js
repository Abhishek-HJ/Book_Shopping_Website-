
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchResults from './components/Search/SearchResults';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import ShopCategory from './pages/ShopCategory';
import Product from './pages/Product';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import LoginSignup from './pages/LoginSignup';
import Footer from './components/Footer/Footer';
import b from './components/assets/b.png';
import e from './components/assets/e.png';
import f from './components/assets/f.png';

function App() {
  return (
    <div >
      <BrowserRouter><Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/PD' element={<ShopCategory banner={b} category='pd'/>}/>
        <Route path='/E' element={<ShopCategory banner={e} category='ed'/>}/>
        <Route path='/F' element={<ShopCategory banner={f} category='f'/>}/>
        <Route path="/search" element={<SearchResults />} />

        <Route path='product/:productId' element={<Product/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSignup/>}/>
      </Routes><Footer/>
      </BrowserRouter>

      

    </div>
  );
}

export default App;
