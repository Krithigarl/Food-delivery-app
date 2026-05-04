import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";

const Addtocart = ({ cartItems, fetchCart }) => {
  const navigate = useNavigate();

  const updateQty = async (itemId, type) => {
    try {
      await axios.patch(`http://localhost:5000/api/cart/${itemId}`, { type });
      await fetchCart(); // refresh cart
    } catch (err) {
      console.error(err);
    }
  };

  const removeItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${itemId}`);
      await fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const totalAmount = cartItems.reduce(
  (total, item) => total + (item?.dish?.price ?? 0) * (item?.qty ?? 0),
  0
);

  return (
    <>
   
<p className='text'>My Product</p>

    
    <div className="container mt-4">
      
      {cartItems.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
          <Button className="btn-login" onClick={() => navigate("/menu")}>
            Go to Menu
          </Button>
        </div>
      ) : (
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Image</th>
              <th>Dish</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th>Action</th>
              <th>Checkout</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item._id}>
                <td>
                  <img src={item.dish.image} alt={item.dish.name} width="80" />
                </td>
                <td>{item.dish.name}</td>
                <td>₹{item.dish.price}</td>
                <td>
                  <Button className="btn-login btn-sm me-2" onClick={() => updateQty(item._id, "dec")}>-</Button>
                  {item.qty}
                  <Button className="btn-login btn-sm ms-2" onClick={() => updateQty(item._id, "inc")}>+</Button>
                </td>
                <td>₹{item.dish.price * item.qty}</td>
                <td>
                  <Button className="btn-login btn-sm" onClick={() => removeItem(item._id)}>Remove</Button>
                </td>
                <td>
                  <Button className="btn-login btn-sm" onClick={()=>navigate(`/menu/summary/${item.dish._id}`)}>Buy now</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {cartItems.length > 0 && <h4 className="text-black">Total Amount: ₹{totalAmount}</h4>}
    </div>
    </>
  );
};

export default Addtocart;
