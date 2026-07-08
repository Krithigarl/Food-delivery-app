import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
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
import Myorder from './components/Myorder';

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
      const res = await axios.get(import.meta.env.VITE_API_URL + "/api/dishes");

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
      const res = await axios.get(import.meta.env.VITE_API_URL + "/api/cart");
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
        <Route path='/placeorder' element={<Place_order cartItems={cartItems} />}/>
        <Route path='/otp' element={<Otp/>}/>
        <Route path='/sucess' element={<OrderSuccess/>}/>
        <Route path='/admin/dashboard' element={<AdminDashboard/>}></Route>
        <Route path='/admin/addfood' element={<AddFood/>}></Route>
        <Route path='/myorder' element={<Myorder menu={menu}/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};

export default App;
