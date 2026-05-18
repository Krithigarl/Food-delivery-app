import React, { useState } from "react";
import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Place_order = ({ cartItems = [] }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if this is a Buy Now order
  const buyNowData = location.state;
  const isBuyNow = buyNowData?.isBuyNow;

  const [formData, setFormData] = useState({
    streetname: "",
    city: "",
    pincode: "",
    payment: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const parseJwt = (token) => {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const user = token ? parseJwt(token) : null;
    const name = localStorage.getItem('username') || "";
    const email = localStorage.getItem('userEmail') || "";
    const userId = user?.id || user?._id || "";

    try {
      const address = `${formData.streetname}, ${formData.city}, ${formData.pincode}`;

      const items = isBuyNow && buyNowData
        ? buyNowData.items
        : cartItems.map((item) => ({
            name: item.dish?.name,
            price: item.dish?.price,
            quantity: item.qty
          }));

      const totalAmount = isBuyNow && buyNowData
        ? buyNowData.totalAmount
        : cartItems.reduce(
            (sum, item) => sum + (item.dish?.price ?? 0) * (item.qty ?? 0),
            0
          );

      const orderData = {
        userId,
        name,
        email,
        items,
        address,
        totalAmount
      };

      await axios.post("http://localhost:5000/api/order/create", orderData);

      navigate('/sucess');
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Order failed. Please try again.");
    }
  };

  return (
    <Container className="mt-5 d-flex justify-content-center">

      <Card className="p-4 shadow" style={{ width: "500px" }}>
        <h3 className="text-center mb-4">Delivery Address</h3>

        <Form onSubmit={handleSubmit}>

          <Form.Group className="mb-3">
            <Form.Label>Street Name</Form.Label>
            <Form.Control
              type="text"
              name="streetname"
              onChange={handleChange}
            />
          </Form.Group>

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Pincode</Form.Label>
                <Form.Control
                  type="number"
                  name="pincode"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Payment Method</Form.Label>

            <Form.Check
              type="radio"
              label="Cash on Delivery"
              name="payment"
              value="cod"
              onChange={handleChange}
            />

            <Form.Check
              type="radio"
              label="UPI"
              name="payment"
              value="upi"
              onChange={handleChange}
            />
          </Form.Group>

          <div className="text-center">
            <Button type="submit" variant="success">
              Place Order
            </Button>
          </div>

        </Form>
      </Card>

    </Container>
  );
};

export default Place_order;