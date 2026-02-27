import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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
    <nav className='navbar'>
<p className='text'><span className='arrow_icon'><Link to="/menu"><i className="uil uil-arrow-left"></i></Link></span>My Product</p>

      </nav>
    <div className="container mt-4">
      <h2>My Product</h2>
      {cartItems.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
          <button className="btn btn-primary" onClick={() => navigate("/menu")}>
            Go to Menu
          </button>
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
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item._id}>
                <td>
                  <img src={item.dish.image} alt={item.dishname} width="80" />
                </td>
                <td>{item.dish.name}</td>
                <td>₹{item.dish.price}</td>
                <td>
                  <button className="btn btn-secondary btn-sm me-2" onClick={() => updateQty(item._id, "dec")}>-</button>
                  {item.qty}
                  <button className="btn btn-secondary btn-sm ms-2" onClick={() => updateQty(item._id, "inc")}>+</button>
                </td>
                <td>₹{item.dish.price * item.qty}</td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => removeItem(item._id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {cartItems.length > 0 && <h4>Total Amount: ₹{totalAmount}</h4>}
    </div>
    </>
  );
};

export default Addtocart;
