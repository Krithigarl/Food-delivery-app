import React from 'react'
import { Col, Row } from 'react-bootstrap'

const Footer = () => {
  return (
    <div>
        <div className="footer">
  <Row>
    <Col>
    <p className='brand1'>Food Express</p>
    <p>Delivering happiness to your doorstep. Order from your favorite restaurants and enjoy fresh, delicious meals at home.</p>
    <p>+91 9047697667</p>
    <p>foodexpress@gmail.com</p>
    </Col>
    <Col>
    <p>Quick Links</p>
    <ul type="none">
      <li>About us</li>
      <li>How it works</li>
      <li>Partner with Us</li>
      <li>Careers</li>
    </ul>
    </Col>
    <Col>
    <p>Quick Links</p>
    <ul type="none">
      <li>About us</li>
      <li>How it works</li>
      <li>Partner with Us</li>
      <li>Careers</li>
    </ul>
    </Col>
    <Col>
    <p>Download App</p>
    <p>Get the FoodExpress app for faster ordering</p>
    <p>Download on the App store</p>
    <p>Get it on play store</p>
    </Col>
  </Row>
</div>
    </div>
  )
}

export default Footer