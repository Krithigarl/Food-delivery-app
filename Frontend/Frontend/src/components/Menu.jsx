import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import axios from 'axios';

const Menu = ({ dishes, fetchCart }) => {
  const [key, setKey] = React.useState('home');
  const navigate = useNavigate();

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
      <nav className='navbar'>
<p className='text'><span className='arrow_icon'><Link to="/"><i className="uil uil-arrow-left"></i></Link></span>The Ocean Restaurant <span className='cart_icon'><Link to='addtocart'><i className="uil uil-shopping-cart-alt"></i></Link></span></p>

      </nav>
      <div className="navbar1"></div>
      <div className="menu-tab">
        <Tabs id="controlled-tab-example" activeKey={key} onSelect={setKey} className="mb-3">
          <Tab eventKey="home" title="Starter">
            {dishes.map((dish) => (
              <Container key={dish._id}>
                <Card className="d-flex flex-row align-items-center p-3 shadow-sm mb-3">
                  <Card.Img
                    src={dish.image}
                    style={{ width: "120px", height: "120px", objectFit: "cover" }}
                  />
                  <Card.Body className="d-flex justify-content-between align-items-center w-100">
                    <div>
                      <Card.Title className="mb-1">{dish.name}</Card.Title>
                      <Card.Text className="text-muted">₹{dish.price}</Card.Text>
                    </div>
                    <Button variant="danger" onClick={() => addToCart(dish)}>Add to Cart</Button>
                  </Card.Body>
                </Card>
              </Container>
            ))}
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default Menu;
