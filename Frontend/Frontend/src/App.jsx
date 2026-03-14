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
import Breakfast from './Pages/Breakfast';
import Navigation from './components/Navigation';
import Order_summary from './components/Order_summary';
import Place_order from './components/Place_order';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [dishes, setDishes] = useState([]);

  // Fetch dishes from backend
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/dishes');
        setDishes(res.data);
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
        <Route path='/breakfast' element={<Breakfast/>}></Route>
        <Route 
          path="/menu" 
          element={<Menu dishes={dishes} fetchCart={fetchCart} />} 
        />
        <Route 
          path="/menu/addtocart" 
          element={<Addtocart cartItems={cartItems} fetchCart={fetchCart} />} 
        />
        <Route path="/menu/summary/:dish" element={<Order_summary dishes={dishes} cartItems={cartItems} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/placeorder' element={<Place_order/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};

export default App;
