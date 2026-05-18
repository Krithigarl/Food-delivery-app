import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const OrderSuccess = () => {
  const navigate = useNavigate();

  // Dummy data (you can replace with real data later)
  const orderId = "ORD" + Math.floor(Math.random() * 1000000);
  const deliveryTime = "30 - 40 mins";

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="text-center p-4 shadow" style={{ width: "400px", borderRadius: "15px" }}>
        
        {/* Success Icon */}
        <FaCheckCircle size={60} color="green" className="mb-3" />

        {/* Title */}
        <h3 className="mb-3"> Order Placed Successfully!</h3>

        {/* Order Details */}
        <p><strong>Order ID:</strong> {orderId}</p>
        <p><strong>Delivery Time:</strong> {deliveryTime}</p>

        {/* Buttons */}
        <div className="d-flex flex-column gap-2 mt-3">
          <Button variant="success" onClick={() => navigate("/")}>
            Go to Home
          </Button>

          <Button variant="outline-primary" onClick={() => navigate("/myorder")}>
            View Orders
          </Button>
        </div>

      </Card>
    </Container>
  );
};

export default OrderSuccess;