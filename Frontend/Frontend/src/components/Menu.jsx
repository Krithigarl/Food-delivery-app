import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';

const Menu = ({ menu, fetchCart }) => {
  const [key, setKey] = React.useState('home');
  const navigate = useNavigate();
console.log(menu.dessert);
  const addToCart = async (dish) => {
    try {
      await axios.post('http://localhost:5000/api/cart', { dishId: dish._id });
      await fetchCart(); // refresh cart from backend
      navigate('/menu/addtocart'); // navigate after adding
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      


     
      <div className="navbar1"><p className='text'>The Ocean Restaurant</p>
      <p className='text1'>Taste the tide, Feel the flavor, The Ocean Restaurant serves freshness in every bite</p></div>
       <h2 className="mb-3 ms-4 text-two text-center">SPECIAL FOODS</h2>
      <div className="menu-tab">
        <Tabs id="controlled-tab-example" activeKey={key} onSelect={setKey} className="mb-3 d-flex justify-content-center border-0">
          <Tab eventKey="home" title="Starter">
            <Container>
            <Row>
            {menu.starter.map((dish) => (  
                  <Col key={dish._id} md={4}>
                <Card className="d-flex align-items-center pb-3 shadow-sm mb-5 w-75" style={{height:"80%"}}>
                  <Card.Img
                    src={dish.image}
                    style={{ width: "266px", height: "180px", objectFit: "cover" }}
                  />
                  <Card.Body className='w-100'>
                    <div className='d-flex  justify-content-between mb-3'>
                      <Card.Title className="">{dish.name}</Card.Title>
                       <Button className='btn-login' onClick={() => addToCart(dish)}>Add</Button>
                    </div>
                     <div className='d-flex justify-content-between'>
                      <Card.Text><i className="uil uil-star"></i><i className="uil uil-star"></i><i className="uil uil-star"></i><i className="uil uil-star"></i><i className="uil uil-star"></i></Card.Text>
                       <Card.Text className="text-muted">₹{dish.price}</Card.Text>
                    </div>
                  </Card.Body>
                 
                 
                </Card>
                </Col> 
            ))}
            </Row>
             </Container>
          </Tab>
          <Tab eventKey="profile" title="Dessert">
            <Container>
            <Row>
            {menu.dessert.map((dish) => (  
                  <Col key={dish._id} md={4}>
                <Card className="d-flex align-items-center pb-3 shadow-sm mb-5 w-75" style={{height:"80%"}}>
                  <Card.Img
                    src={dish.image}
                    style={{ width: "266px", height: "180px", objectFit: "cover" }}
                  />
                  <Card.Body className='w-100'>
                    <div className='d-flex  justify-content-between mb-3'>
                      <Card.Title className="">{dish.name}</Card.Title>
                       <Button className='btn-login' onClick={() => addToCart(dish)}>Add</Button>
                    </div>
                     <div className='d-flex justify-content-between'>
                      <Card.Text><i className="uil uil-star"></i><i className="uil uil-star"></i><i className="uil uil-star"></i><i className="uil uil-star"></i><i className="uil uil-star"></i></Card.Text>
                       <Card.Text className="text-muted">₹{dish.price}</Card.Text>
                    </div>
                  </Card.Body>
                 
                 
                </Card>
                </Col> 
            ))}
            </Row>
             </Container>
          </Tab>
          <Tab eventKey="main" title="Main Course">
  <Container>
    <Row>
      {menu?.main?.map((dish) => (
        <Col key={dish._id} md={4}>
          <Card className="d-flex align-items-center pb-3 shadow-sm mb-5 w-75">
            <Card.Img
              src={dish.image}
              style={{ width: "266px", height: "180px", objectFit: "cover" }}
            />
            <Card.Body className='w-100'>
              <div className='d-flex justify-content-between mb-3'>
                <Card.Title>{dish.name}</Card.Title>
                <Button className='btn-login' onClick={() => addToCart(dish)}>Add</Button>
              </div>
              <div className='d-flex justify-content-between'>
                <Card.Text>⭐⭐⭐⭐⭐</Card.Text>
                <Card.Text className="text-muted">₹{dish.price}</Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
</Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default Menu;
