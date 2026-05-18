import React from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { Container, Row, Col, Table, Card, Button } from "react-bootstrap";
import axios from "axios";

const Order_summary = ({ cartItems = [] }) => {
  const { dish } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if this is a "Buy Now" flow
  const isBuyNow = location.state?.isBuyNow;
  const directProduct = location.state?.product;
  const quantity = location.state?.quantity || 1;

  let product;

  if (isBuyNow && directProduct) {
    // For Buy Now flow, use the product passed directly
    product = {
      dish: directProduct,
      qty: quantity
    };
  } else {
    // For cart flow, find product in cartItems
    product = cartItems.find((p) => p.dish._id === dish);
  }

  if (!product) {
    return <h1 className="text-center mt-5">No Product Found</h1>;
  }

  const placeOrder = async () => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to place order');
      navigate('/login');
      return;
    }

    if (isBuyNow) {
      // For Buy Now, navigate to place order with the specific product
      navigate('/placeorder', {
        state: {
          items: [{
            name: product.dish.name,
            price: product.dish.price,
            quantity: product.qty
          }],
          totalAmount: product.dish.price * product.qty,
          isBuyNow: true
        }
      });
    } else {
      // For cart flow, navigate to place order page
      navigate('/placeorder');
    }
  };

  return (
    <>

      {/* Navbar */}
     
        <h4 className="text">Order Summary</h4>
  
<Container className="order-page">
      <Card className="order-card shadow">

        <Row className="align-items-center">

          {/* Product Image */}
          <Col md={5} className="text-center">
            <img
              src={product.dish.image}
              alt={product.dish.name}
              className="product-img"
            />
          </Col>

          {/* Product Details */}
          <Col md={7}>
            <h3>{product.dish.name}</h3>
            <p className="text-muted">
              Delicious food prepared with fresh ingredients.
            </p>

            <h4 className="price">₹{product.dish.price}</h4>

            <Table bordered className="mt-4 order-table">
              <tbody>
                <tr>
                  <td>Price</td>
                  <td>₹{product.dish.price}</td>
                </tr>

                <tr>
                  <td>Quantity</td>
                  <td>{product.qty}</td>
                </tr>

                <tr>
                  <td>Total</td>
                  <td>₹{product.dish.price * product.qty}</td>
                </tr>
              </tbody>
            </Table>

            <Button variant="success" className="place-btn" onClick={placeOrder}>
              Place Order
            </Button>

          </Col>

        </Row>

      </Card>

    </Container>
    </>
  );
};

export default Order_summary;