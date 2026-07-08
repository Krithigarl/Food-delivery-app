import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Load saved email from cookie when page opens
  useEffect(() => {
    const savedEmail = Cookies.get("rememberEmail");

    if (savedEmail) {
      setFormData((prev) => ({
        ...prev,
        email: savedEmail
      }));
      setRememberMe(true);
    }
  }, []);

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
        import.meta.env.VITE_API_URL + "/api/users/login",
        formData
      );

      setMessage(res.data.message);

      if (res.data.success) {
        const token = res.data.token;

        // Save token in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("username", res.data.user.name);
        localStorage.setItem("userEmail", res.data.user.email);

        // Remember Me Cookie
        if (rememberMe) {
          Cookies.set("rememberEmail", formData.email, {
            expires: 7 // save for 7 days
          });
        } else {
          Cookies.remove("rememberEmail");
        }

        const user = JSON.parse(atob(token.split(".")[1]));

        if (user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
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

                {/* Remember Me Checkbox */}
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Remember Me"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                </Form.Group>

                <Button type="submit" className="w-100 mb-3 btn-login">
                  Login
                </Button>
              </Form>

              {message && (
                <p className="text-center text-danger">{message}</p>
              )}

              <div className="text-center my-3">
                <span>OR</span>
              </div>

              <Button variant="light" className="w-100 mb-2 border">
                <FcGoogle size={22} className="me-2" />
                Continue with Google
              </Button>

              <Button className="w-100 mb-3 btn-login">
                <FaFacebook size={20} className="me-2" />
                Continue with Facebook
              </Button>

              <p className="text-center">
                Don't have an account?{" "}
                <Link to="/register" style={{ color: "#198754" }}>
                  Register
                </Link>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;