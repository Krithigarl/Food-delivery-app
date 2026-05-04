import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Menu from './components/Menu';
import Addtocart from './components/Addtocart';
import Login from './Pages/Login';
import Register from './Pages/Register';
import axios from 'axios';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import Order_summary from './components/Order_summary';
import Place_order from './components/Place_order';
import Otp from './components/Otp'
import OrderSuccess from './components/Sucess';
import AdminDashboard from './Dashboard/Admindashboard';
import AddFood from './Dashboard/Addfoodform';
import { useAccordionButton } from 'react-bootstrap';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [menu, setMenu] = useState({
  starter: [],
  main: [],
  dessert: []
});
  // Fetch dishes from backend
useEffect(() => {
  const fetchDishes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/dishes");

      const restaurantData = res.data.filter(
        (dish) => dish.resturant === "oceanResturant"
      );

      setMenu({
        starter: restaurantData.filter(
          (d) => d.category.toLowerCase() === "starter"
        ),
        main: restaurantData.filter(
          (d) => d.category.toLowerCase() === "main"
        ),
        dessert: restaurantData.filter(
          (d) => d.category.toLowerCase() === "dessert"
        ),
      });

    } catch (err) {
      console.error(err);
    }
  };

  fetchDishes();
}, []);

  // Fetch cart items from backend
  const fetchCart = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/cart');
      setCartItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <BrowserRouter>
    <Navigation/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/menu" 
          element={<Menu menu={menu} fetchCart={fetchCart} />} 
        />
        <Route 
          path="/menu/addtocart" 
          element={<Addtocart cartItems={cartItems} fetchCart={fetchCart} />} 
        />
        <Route path="/menu/summary/:dish" element={<Order_summary menu={menu} cartItems={cartItems} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/placeorder' element={<Place_order/>}/>
        <Route path='/opt' element={<Otp/>}/>
        <Route path='/sucess' element={<OrderSuccess/>}/>
        <Route path='/admin/dashboard' element={<AdminDashboard/>}></Route>
        <Route path='/admin/addfood' element={<AddFood/>}></Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};

export default App;
