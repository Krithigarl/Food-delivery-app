import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";

const Addtocart = ({ cartItems = [], fetchCart }) => {

  const navigate = useNavigate();

  // ✅ Popup State
  const [showPopup, setShowPopup] = useState(false);

  // ✅ Check Login
  const checkLogin = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setShowPopup(true);
      return false;
    }

    return true;
  };

  // ✅ Update Quantity
  const updateQty = async (itemId, type) => {

    if (!checkLogin()) return;

    try {

      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/cart/${itemId}`,
        { type }
      );

      await fetchCart();

    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Remove Item
  const removeItem = async (itemId) => {

    if (!checkLogin()) return;

    try {

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/cart/${itemId}`
      );

      await fetchCart();

    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Buy Now
  const handleBuyNow = (item) => {

    if (!checkLogin()) return;

    navigate(
      `/menu/summary/${item?.dish?._id}`,
      {
        state: {
          product: item?.dish,
          quantity: item?.qty,
          isBuyNow: true
        }
      }
    );
  };

  // ✅ Total Amount
  const totalAmount = cartItems.reduce(
    (total, item) =>
      total + (item?.dish?.price ?? 0) * (item?.qty ?? 0),
    0
  );

  return (
    <>

      <p className="text">My Product</p>

      <div className="container mt-4">

        {cartItems.length === 0 ? (

          <div>
            <p>Your cart is empty.</p>

            <Button
              className="btn-login"
              onClick={() => navigate("/menu")}
            >
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
                    <img
                      src={item?.dish?.image}
                      alt={item?.dish?.name}
                      width="80"
                    />
                  </td>

                  <td>{item?.dish?.name}</td>

                  <td>₹{item?.dish?.price}</td>

                  <td>

                    <Button
                      className="btn-login btn-sm me-2"
                      onClick={() =>
                        updateQty(item._id, "dec")
                      }
                    >
                      -
                    </Button>

                    {item.qty}

                    <Button
                      className="btn-login btn-sm ms-2"
                      onClick={() =>
                        updateQty(item._id, "inc")
                      }
                    >
                      +
                    </Button>

                  </td>

                  <td>
                    ₹{
                      (item?.dish?.price ?? 0) *
                      (item?.qty ?? 0)
                    }
                  </td>

                  <td>

                    <Button
                      className="btn-login btn-sm"
                      onClick={() => removeItem(item._id)}
                    >
                      Remove
                    </Button>

                  </td>

                  <td>

                    <Button
                      className="btn-login btn-sm"
                      onClick={() => handleBuyNow(item)}
                    >
                      Buy now
                    </Button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

        {cartItems.length > 0 && (
          <h4 className="text-black">
            Total Amount: ₹{totalAmount}
          </h4>
        )}

      </div>

      {/* ✅ LOGIN POPUP */}

      {showPopup && (

        <div className="popup-overlay">

          <div className="popup-box">

            <h3>You are not logged in</h3>

            <p>Please login to continue</p>

            <div className="mt-3">

              <Button
                className="btn-login me-2"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>

              <Button
                variant="secondary"
                onClick={() => setShowPopup(false)}
              >
                Close
              </Button>

            </div>

          </div>

        </div>

      )}

    </>
  );
};

export default Addtocart;