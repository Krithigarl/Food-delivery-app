import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import breakfast from '../assets/Breakfast.jpg'
import dinner from '../assets/dinner.jpg'
import lunch from '../assets/lunch.jpg'
import TheOceanRestaurant from '../assets/The Ocean Restaurant (2).jpg'
import ZamZamRestaurant from '../assets/Zam Zam Restaurant2.jpg'
import TheCurry from '../assets/The Curry.jpg'
import SreeAditti from '../assets/Sree Aditti Bhavan.jpg'
import Hotel from '../assets/Hotel Saravana.jpg'
import Arafa from '../assets/Arafa Restaurant.jpg'
import bgvideo1 from '../assets/bgvideo1.mp4'
import { useNavigate } from 'react-router';
const Home = () => {
    const category = [{ id: 201, name: "Breakfast", images: breakfast },
        { id: 201, name: "Lunch", images: lunch },
        { id: 202, name: "Lunch", images: lunch },
        {id:203, name:"Dinner", images: dinner}
    ]
    const navigate = useNavigate();
    const restaurant = [{id:201,Rest_name:"The Ocean Restaurant",images:TheOceanRestaurant,rating:"3.9",delviery_min:"20-30min"},
      {id:202,Rest_name:"Zam Zam Restaurant",images:ZamZamRestaurant,rating:"4.4",delviery_min:"15-20min"},
      {id:203,Rest_name:"The Curry",images:TheCurry,rating:"3.9",delviery_min:"20-25min"},
      {id:204,Rest_name:"Sree Aditti Bhavan",images:SreeAditti,rating:"4.5",delviery_min:"15-20min"},
      {id:205,Rest_name:"Hotel Saravana",images:Hotel,rating:"4.9",delviery_min:"10-15min"},
      {id:206,Rest_name:"Arafa Restaurant",images:Arafa,rating:"4.8",delviery_min:"15-20min"}
    ]
    const [inputValue, setInputValue] = useState("");
    const [showSelect, setShowSelect] = useState(false);
    return (
        <div>
          <div className="bgimage">
            <Navbar className="navbar" sticky="top">
                <Container>
                    <Navbar.Brand href="#home" className='brand'>Food Express</Navbar.Brand>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Search location"
                            value={inputValue}
                            onFocus={() => setShowSelect(true)}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        {showSelect && (
                            <Form.Select
                                className="mt-2"
                                onChange={(e) => {
                                    setInputValue(e.target.value);
                                    setShowSelect(false);
                                }}>
                                <option value="">Select location</option>
                                <option value="Nagercoil, Kanyakumari">
                                    Nagercoil, Kanyakumari
                                </option>
                                <option value="Chennai">Chennai</option>
                                <option value="Coimbatore">Coimbatore</option>
                            </Form.Select>
                        )}
                    </Form.Group>

                </Container>
            </Navbar>
            <div className="Search-box">
                <form action="">
                    <i className="uil uil-search icon-one"></i>
                    <input type="Search" placeholder='Search restaurant or food' className='search-input' />
                </form>
            </div>
            <div className="video-container">
      
      {/* Background Video */}
      <div className="video-container hero">
      <video autoPlay loop muted className="video-bg">
        <source src={bgvideo1} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
       <Container className="content text-center text-black">
        <h1>Fresh & Tasty, Just For You</h1>
        <p>This is background video using React Bootstrap</p>
      </Container>
      </div>
            </div>
            
           <div className="category">
  <h5 className="mb-3 ms-4 text-two">What's on your mind?</h5>

  <Container>
    <Row className="g-3 justify-content-center">
      {category.map((items) => (
        <Col
          key={items.id}
          xs={6}
          sm={4}
          md={3}
          lg={2}
        >
          <Card className="text-center h-100 category-card" >
            <Card.Img
              variant="top"
              src={items.images}
              className="images-category"
            />
            <Card.Body>
              <Card.Title className="fs-6">
                {items.name}
              </Card.Title>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
</div>
{/* POPULAR RESTANUART */}

<div className="restaurant">
  <h2 className='text-one'>POPULAR RESTAURANT</h2>
  <Container>
  <Row>
    {restaurant.map((rest)=>(
      <Col md={12} lg={4} key={rest.id}>
<Card className='img_rest1'onClick={()=>navigate("/menu")} style={{ cursor: "pointer" }}>
      <Card.Img variant="top" src={rest.images} className='img_rest'/>
      <Card.Body>
        <Card.Title>{rest.Rest_name}</Card.Title>
        <Card.Text className='card-one'>
          <p><span className="fa fa-star star me-2"></span>{rest.rating}</p>
          <p className='delivery'>{rest.delviery_min}</p>
        </Card.Text>
      </Card.Body>
    </Card>
    </Col>
    ))}
    
  </Row>
  </Container>
</div>

</div>

</div>
    )
}

export default Home