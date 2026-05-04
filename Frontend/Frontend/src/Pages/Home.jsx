import React, { useState } from 'react'
import { CardLink, Col, Container, Row } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import breakfast from '../assets/Breakfast.png'
import dinner from '../assets/dinner.png'
import lunch from '../assets/meal.png'
import snack from '../assets/snack.png'
import TheOceanRestaurant from '../assets/The Ocean Restaurant (2).jpg'
import ZamZamRestaurant from '../assets/Zam Zam Restaurant2.jpg'
import TheCurry from '../assets/The Curry.jpg'
import SreeAditti from '../assets/Sree Aditti Bhavan.jpg'
import Hotel from '../assets/Hotel Saravana.jpg'
import Arafa from '../assets/Arafa Restaurant.jpg'
import bgvideo1 from '../assets/bgvideo1.mp4'
import { useNavigate } from 'react-router';
const Home = () => {
  const category = [{ id: 201, name: "Breakfast", images: breakfast,topic:"4 Restaurants Products" },
  { id: 201, name: "Lunch", images: lunch,topic:"10 Restaurants Products" },
  { id: 202, name: "snack", images: snack,topic:"7 Restaurants Products" },
  { id: 203, name: "Dinner", images: dinner,topic:"2 Restaurants Products" }
  ]
  const navigate = useNavigate();
  const restaurant = [{ id: 201, Rest_name: "The Ocean Restaurant", images: TheOceanRestaurant, rating: "3.9", delviery_min: "20-30min" },
  { id: 202, Rest_name: "Zam Zam Restaurant", images: ZamZamRestaurant, rating: "4.4", delviery_min: "15-20min" },
  { id: 203, Rest_name: "The Curry", images: TheCurry, rating: "3.9", delviery_min: "20-25min" },
  { id: 204, Rest_name: "Sree Aditti Bhavan", images: SreeAditti, rating: "4.5", delviery_min: "15-20min" },
  { id: 205, Rest_name: "Hotel Saravana", images: Hotel, rating: "4.9", delviery_min: "10-15min" },
  { id: 206, Rest_name: "Arafa Restaurant", images: Arafa, rating: "4.8", delviery_min: "15-20min" }
  ]
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", search);
  };

  return (
    <div>
      <div className="bgimage">
        <Form className="d-flex w-75 my-4 mx-5 " onSubmit={handleSearch}>

          <Form.Control
            type="text"
            list="foodlist"
            placeholder="Search food..."
            className="me-2 form-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <datalist id="foodlist">
            <option value="Pizza" />
            <option value="Burger" />
            <option value="Biryani" />
            <option value="Dosa" />
            <option value="Fried Rice" />
          </datalist>
          <Button type='submit' className='button1'>Search</Button>
        </Form>
        <div className="video-container">

          {/* Background Video */}
          <div className="video-container hero">
            <video autoPlay loop muted className="video-bg">
              <source src={bgvideo1} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <Container className="content text-center text-black">
              <h1>Food That Feels Like Home </h1>
              <p>
                Bringing you comfort, taste, and love in every dish.
              </p>
            </Container>
          </div>
        </div>

        <div className="category">
          <h6 className=" ms-4 text-two1 text-center">TOP FOODS</h6>
          <h2 className="mb-3 ms-4 text-two text-center">CATEGORY</h2>

          <Container>
            <Row className="g-3">
              {category.map((items) => (
                <Col
                  key={items.id}
                  sm={12}
                  md={3}
                >
                  <Card className="text-center category-card ">
                    <Card.Img
                      variant="top"
                      src={items.images}
                      className="images-category"
                    />
                    <Card.Body>
                      <Card.Title className="fs-6">
                        {items.name}
                      </Card.Title>
                       <Card.Title className="fs-6">
                        {items.topic}
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
              {restaurant.map((rest) => (
                <Col sm={6} md={4} key={rest.id} >
                  <Card className='img_rest1' onClick={() => navigate("/menu")} style={{ cursor: "pointer" }}>
                    <Card.Img variant="top" src={rest.images} className='img_rest' />
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