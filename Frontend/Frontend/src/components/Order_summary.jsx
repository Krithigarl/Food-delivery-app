import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Table, Card, Button } from "react-bootstrap";

const Order_summary = ({ cartItems = [] }) => {

  const { dish } = useParams();

  const product = cartItems.find((p) => p.dish._id === dish);

  if (!product) {
    return <h1 className="text-center mt-5">No Product Found</h1>;
  }
const navigate = useNavigate()
  return (
    <Container className="order-page">

      {/* Navbar */}
      <nav className="order-navbar">
        <Link to="/" className="back-btn">
          ← Back
        </Link>
        <h4>Order Summary</h4>
      </nav>

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

            <Button variant="success" className="place-btn" onClick={()=>navigate('/placeorder')}>
              Place Order
            </Button>

          </Col>

        </Row>

      </Card>

    </Container>
  );
};

export default Order_summary;