import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import axios from 'axios';

const Menu = ({ menu = {}, fetchCart }) => {

  const [key, setKey] = useState('home');
  const [Loading, setLoading] = useState(false);

  // ✅ Popup State
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  // ✅ Login Check
  const checkLogin = () => {

    const token = localStorage.getItem('token');

    if (!token) {
      setShowPopup(true);
      return false;
    }

    return true;
  };

  // ✅ Add To Cart
  const addToCart = async (dish) => {

    if (!checkLogin()) return;

    try {

      setLoading(true);

      await axios.post(
        'http://localhost:5000/api/cart',
        { dishId: dish._id }
      );

      await fetchCart();

      navigate('/menu/addtocart');

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }
  };

  // ✅ Buy Now
  const buyNow = (dish) => {

    if (!checkLogin()) return;

    navigate(
      `/menu/summary/${dish._id}`,
      {
        state: {
          product: dish,
          quantity: 1,
          isBuyNow: true
        }
      }
    );
  };

  if (!menu?.starter) return <p>Loading menu</p>;

  return (
    <div>

      <div className="navbar1">

        <p className='text'>The Ocean Restaurant</p>

        <p className='text1'>
          Taste the tide, Feel the flavor,
          The Ocean Restaurant serves freshness in every bite
        </p>

      </div>

      <h2 className="mb-3 ms-4 text-two text-center">
        SPECIAL FOODS
      </h2>

      {Loading && (
        <div className='text-center my-3'>
          <Spinner animation="border" />
        </div>
      )}

      <div className="menu-tab">

        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={setKey}
          className="mb-3 d-flex justify-content-center border-0"
        >

          {/* STARTER */}

          <Tab eventKey="home" title="Starter">

            <Container>
              <Row>

                {menu?.starter?.map((dish) => (

                  <Col key={dish._id} md={4}>

                    <Card
                      className="d-flex align-items-center pb-3 shadow-sm mb-5 w-75"
                      style={{ height: "80%" }}
                    >

                      <Card.Img
                        src={dish.image}
                        style={{
                          width: "266px",
                          height: "180px",
                          objectFit: "cover"
                        }}
                      />

                      <Card.Body className='w-100'>

                        <div className='d-flex justify-content-between mb-3'>

                          <Card.Title>
                            {dish.name}
                          </Card.Title>

                          <div>

                            <Button
                              variant='success'
                              onClick={() => addToCart(dish)}
                            >
                              Add
                            </Button>

                            <Button
                              variant='success'
                              className='ms-2'
                              onClick={() => buyNow(dish)}
                            >
                              Buy Now
                            </Button>

                          </div>

                        </div>

                        <div className='d-flex justify-content-between'>

                          <Card.Text>
                            ⭐⭐⭐⭐⭐
                          </Card.Text>

                          <Card.Text className="text-muted">
                            ₹{dish.price}
                          </Card.Text>

                        </div>

                      </Card.Body>

                    </Card>

                  </Col>

                ))}

              </Row>
            </Container>

          </Tab>

          {/* DESSERT */}

          <Tab eventKey="profile" title="Dessert">

            <Container>
              <Row>

                {menu?.dessert?.map((dish) => (

                  <Col key={dish._id} md={4}>

                    <Card
                      className="d-flex align-items-center pb-3 shadow-sm mb-5 w-75"
                    >

                      <Card.Img
                        src={dish.image}
                        style={{
                          width: "266px",
                          height: "180px",
                          objectFit: "cover"
                        }}
                      />

                      <Card.Body className='w-100'>

                        <div className='d-flex justify-content-between mb-3'>

                          <Card.Title>
                            {dish.name}
                          </Card.Title>

                          <div>

                            <Button
                              variant='success'
                              onClick={() => addToCart(dish)}
                            >
                              Add
                            </Button>

                            <Button
                              variant='success'
                              className='ms-2'
                              onClick={() => buyNow(dish)}
                            >
                              Buy Now
                            </Button>

                          </div>

                        </div>

                        <div className='d-flex justify-content-between'>

                          <Card.Text>
                            ⭐⭐⭐⭐⭐
                          </Card.Text>

                          <Card.Text className="text-muted">
                            ₹{dish.price}
                          </Card.Text>

                        </div>

                      </Card.Body>

                    </Card>

                  </Col>

                ))}

              </Row>
            </Container>

          </Tab>

          {/* MAIN COURSE */}

          <Tab eventKey="main" title="Main Course">

            <Container>
              <Row>

                {menu?.main?.map((dish) => (

                  <Col key={dish._id} md={4}>

                    <Card
                      className="d-flex align-items-center pb-3 shadow-sm mb-5 w-75"
                    >

                      <Card.Img
                        src={dish.image}
                        style={{
                          width: "266px",
                          height: "180px",
                          objectFit: "cover"
                        }}
                      />

                      <Card.Body className='w-100'>

                        <div className='d-flex justify-content-between mb-3'>

                          <Card.Title>
                            {dish.name}
                          </Card.Title>

                          <div>

                            <Button
                              variant='success'
                              onClick={() => addToCart(dish)}
                            >
                              Add
                            </Button>

                            <Button
                              variant='success'
                              className='ms-2'
                              onClick={() => buyNow(dish)}
                            >
                              Buy Now
                            </Button>

                          </div>

                        </div>

                        <div className='d-flex justify-content-between'>

                          <Card.Text>
                            ⭐⭐⭐⭐⭐
                          </Card.Text>

                          <Card.Text className="text-muted">
                            ₹{dish.price}
                          </Card.Text>

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

      {/* ✅ LOGIN POPUP */}

      {showPopup && (

        <div className="popup-overlay">

          <div className="popup-box">

            <h3>You are not logged in</h3>

            <p>Please login to continue</p>

            <div className="mt-3">

              <Button
                variant="success"
                className="me-2"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>

              <Button
                variant="secondary"
                onClick={() => setShowPopup(false)}
              >
                Close
              </Button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Menu;