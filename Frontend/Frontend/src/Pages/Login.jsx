import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const Login = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        formData
      );

      setMessage(res.data.message);

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.user.name);
        navigate("/");
      }

    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred");
    }
  };

  return (

    <Container className="d-flex justify-content-center align-items-center vh-100">

      <Row>
        <Col>

          <Card style={{ width: "400px" }} className="p-4 shadow">

            <Card.Body>

              <h3 className="text-center mb-4">Login</h3>

              <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mb-3">
                  Login
                </Button>

              </Form>

              {message && <p className="text-center text-danger">{message}</p>}

              <div className="text-center my-3">
                <span>OR</span>
              </div>

              <Button variant="light" className="w-100 mb-2 border">
                <FcGoogle size={22} className="me-2" />
                Continue with Google
              </Button>

              <Button variant="primary" className="w-100 mb-3">
                <FaFacebook size={20} className="me-2" />
                Continue with Facebook
              </Button>

              <p className="text-center">
                Don't have an account?{" "}
                <Link to="/register">Register</Link>
              </p>

            </Card.Body>

          </Card>

        </Col>
      </Row>

    </Container>

  );
};

export default Login;