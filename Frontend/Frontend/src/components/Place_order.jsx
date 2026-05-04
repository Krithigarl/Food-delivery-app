import React, { useState } from "react";
import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Place_order = () => {

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

  const handleSubmit = async (e) => {
    e.preventDefault();
      
    try {

      await axios.post("http://localhost:5000/api/placeorder", formData);

      


    } catch (error) {
      console.log(error);
    }
  };
const navigate = useNavigate()
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
            <Button type="submit" variant="success" onClick={()=>navigate("/sucess")}>
              Place Order
            </Button>
          </div>

        </Form>
      </Card>

    </Container>
  );
};

export default Place_order;