import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home/>} />
      </Routes>
      <Routes>
        <Route exact path='/products/:categoria' element={<ProductList/>} />
      </Routes>
      <Routes>
        <Route exact path='/product/:id' element={<Product/>} />
      </Routes>
      <Routes>
        <Route exact path='/cart' element={<Cart/>} />
      </Routes>
      <Routes>
        <Route exact path='/success' element={<Success/>} />
      </Routes>
      <Routes>
        <Route exact path='/login' element={user ? <Navigate to="/"/> : <Login/>} />
        
      </Routes>
      <Routes>
        <Route exact path='/register' element={<Register/>} />
      </Routes>
    </Router>
  );
};

export default App;