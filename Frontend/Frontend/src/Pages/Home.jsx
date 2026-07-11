import React, { useState } from 'react'
import { CardLink, Col, Container, Row } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import breakfast from '../assets/breakfast.png'
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
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const category = [
    { id: 201, name: "Breakfast", images: breakfast, topic: "4 Restaurants Products" },
    { id: 202, name: "Lunch", images: lunch, topic: "10 Restaurants Products" },
    { id: 203, name: "Snack", images: snack, topic: "7 Restaurants Products" },
    { id: 204, name: "Dinner", images: dinner, topic: "2 Restaurants Products" }
  ];
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
  const testimonials = [
    {
      id: 1,
      name: "Krithiga",
      role: "IT Professional",
      image:
        "https://i.pravatar.cc/100?img=1",
      text: "I have been using this food delivery service for a few months now, and I am extremely satisfied with the quality of food and the prompt delivery. The variety of options available is impressive, and the customer service is top-notch. Highly recommended!"
    },

    {
      id: 2,
      name: "Ramalingam",
      role: "Builder",
      image:
        "https://i.pravatar.cc/100?img=2",
      text: "The food delivery service has been a game-changer for me. The convenience of ordering food from my favorite restaurants and having it delivered to my doorstep is fantastic. The delivery drivers are always friendly and efficient, and the food arrives hot and fresh."
    },

    {
      id: 3,
      name: "Viswa",
      role: "Photographer",
      image:
        "https://i.pravatar.cc/100?img=3",
      text: "I have tried several food delivery services, but this one stands out for its exceptional quality and reliability. The food is consistently delicious, and the delivery is always on time. The user-friendly app makes ordering a breeze, and the customer support team is responsive and helpful."
    }
  ];

  const [current, setCurrent] = useState(1);

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrent((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
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
                          <div className="d-flex justify-content-between align-items-center">
                            <span><span className="fa fa-star star me-2"></span>{rest.rating}</span>
                            <span className='delivery'>{rest.delviery_min}</span>
                          </div>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}

              </Row>
            </Container>
          </div>
          {/* Why Choose Us */}
          <div className="choose">
            <h2 className='text-one'>WHY CHOOSE US</h2>
            <Container>
              <Row>
                <Col md={4}>
                  <Card className="shadow mt-5">
                    <Card.Body>
                      <h5>Fast Delivery</h5>
                      <p>Get your food delivered to your doorstep in record time with our lightning-fast delivery service.</p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="shadow mt-5">
                    <Card.Body>
                      <h5>Quality Food</h5>
                      <p>Experience the finest flavors and freshest ingredients with our commitment to quality food that satisfies every craving.</p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="shadow mt-5">
                    <Card.Body>
                      <h5>Excellent Service</h5>
                      <p>Our dedicated team is here to provide you with excellent service, ensuring a seamless and enjoyable dining experience from start to finish.</p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
          {/* FeedBack */}
          <p className="small-heading">
                What our customers say about us
              </p>

              <h2 className="text-one">
                TESTIMONIALS
              </h2>
          <div className="testimonial-section">

            <div className="testimonial-container">

              

              <div className="testimonial-slider">

                {/* Left Arrow */}
                <button
                  className="arrow left"
                  onClick={prevSlide}
                >
                  ❮
                </button>

                {/* Cards */}

                {testimonials.map((item, index) => {

                  let position = "nextSlide";

                  if (index === current) {
                    position = "activeSlide";
                  }

                  if (
                    index === current - 1 ||
                    (current === 0 &&
                      index === testimonials.length - 1)
                  ) {
                    position = "lastSlide";
                  }

                  return (
                    <article
                      className={`testimonial-card ${position}`}
                      key={item.id}
                    >

                      <div className="profile">

                        <img
                          src={item.image}
                          alt={item.name}
                        />

                        <div>
                          <h4>{item.name}</h4>
                          <p>{item.role}</p>
                        </div>

                      </div>

                      <p className="description">
                        {item.text}
                      </p>

                    </article>
                  );
                })}

                {/* Right Arrow */}

                <button
                  className="arrow right"
                  onClick={nextSlide}
                >
                  ❯
                </button>

              </div>

              {/* Dots */}

              <div className="dots">

                {testimonials.map((_, index) => (
                  <span
                    key={index}
                    className={
                      current === index
                        ? "dot active-dot"
                        : "dot"
                    }
                  />
                ))}

              </div>

            </div>

          </div>

        </div>

      </div>
    )
  }

  export default Home;