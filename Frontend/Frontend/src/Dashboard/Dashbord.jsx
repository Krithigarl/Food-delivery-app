import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button, Table, Navbar, Nav } from "react-bootstrap";
import axios from 'axios';
const Dashbord = () => {
    const [data, setData] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/dashboard',{
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
}).then(res => setData(res.data));
  }, []);
  return (
    <div>
        <Row className="mb-4 mt-5">
              <Col md={4}>
                <Card className="shadow">
                  <Card.Body>
                    <h5>Total Foods</h5>
                    <h3>{data.totalFoods}</h3>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
                <Card className="shadow">
                  <Card.Body>
                    <h5>Total Orders</h5>
                    <h3>{data.totalOrders}</h3>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
                <Card className="shadow">
                  <Card.Body>
                    <h5>Users</h5>
                    <h3>{data.totalUsers}</h3>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="shadow mt-5">
                  <Card.Body>
                    <h5>Users</h5>
                    <h3> ₹{data.revenue}</h3>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
    </div>
  )
}

export default Dashbord