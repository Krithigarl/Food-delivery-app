import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";

import {
  Container,
  Row,
  Col,
  Table,
  Card,
  Button,
  Form,
  ProgressBar,
} from "react-bootstrap";

const Order_summary = ({ cartItems = [] }) => {
  const { dish } = useParams();

  const navigate = useNavigate();

  const location = useLocation();

  // ================= STATES =================

  const [reviews, setReviews] = useState([]);

  const [rating, setRating] = useState(0);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [reviewText, setReviewText] = useState("");

  const [averageRating, setAverageRating] = useState(0);

  // ================= PRODUCT =================

  const isBuyNow = location.state?.isBuyNow;

  const directProduct = location.state?.product;

  const quantity = location.state?.quantity || 1;

  let product;

  if (isBuyNow && directProduct) {
    product = {
      dish: directProduct,
      qty: quantity,
    };
  } else {
    product = cartItems.find((p) => p.dish._id === dish);
  }

  if (!product) {
    return <h1 className="text-center mt-5">No Product Found</h1>;
  }

  // ================= GET REVIEWS =================

  const fetchReviews = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/reviews/${dish}`
      );

      const responseData = res.data;
      const reviewList = Array.isArray(responseData)
        ? responseData
        : responseData.reviews || [];

      setReviews(reviewList);

      // Average Rating
      if (typeof responseData.averageRating === "number") {
        setAverageRating(responseData.averageRating.toFixed(1));
      } else if (reviewList.length > 0) {
        const total =
          reviewList.reduce((acc, item) => acc + item.rating, 0) /
          reviewList.length;

        setAverageRating(total.toFixed(1));
      } else {
        setAverageRating(0);
      }
    } catch (err) {
      console.log(err);
      setReviews([]);
      setAverageRating(0);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // ================= SUBMIT REVIEW =================

  const submitReview = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/reviews", {
        productId: dish,
        name,
        email,
        rating,
        review: reviewText,
      });

      alert("Review Added");

      setName("");

      setEmail("");

      setRating(0);

      setReviewText("");

      fetchReviews();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= PLACE ORDER =================

  const placeOrder = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to place order");

      navigate("/login");

      return;
    }

    if (isBuyNow) {
      navigate("/placeorder", {
        state: {
          items: [
            {
              name: product.dish.name,
              price: product.dish.price,
              quantity: product.qty,
            },
          ],

          totalAmount: product.dish.price * product.qty,

          isBuyNow: true,
        },
      });
    } else {
      navigate("/placeorder");
    }
  };

  return (
    <Container className="my-5">
      <h2 className="text-one">
        ORDER SUMMARY
      </h2>

      {/* PRODUCT */}

      <Card className="shadow p-4 mb-5">
        <Row className="align-items-center">
          <Col md={5} className="text-center">
            <img
              src={product.dish.image}
              alt={product.dish.name}
              className="img-fluid rounded"
              style={{ maxHeight: "300px" }}
            />
          </Col>

          <Col md={7}>
            <h3>{product.dish.name}</h3>

            <p className="text-muted">
              Delicious food prepared with fresh
              ingredients.
            </p>

            <h4 className="text-success mb-4">
              ₹{product.dish.price}
            </h4>

            <Table bordered>
              <tbody>
                <tr>
                  <td>Price</td>

                  <td>₹{product.dish.price}</td>
                </tr>

                <tr>
                  <td>Quantity</td>

                  <td>{product.qty}</td>
                </tr>

                <tr>
                  <td>Total</td>

                  <td>
                    ₹
                    {product.dish.price *
                      product.qty}
                  </td>
                </tr>
              </tbody>
            </Table>

            <Button
              variant="success"
              onClick={placeOrder}
              className="w-75 position-relative start-50 translate-middle-x"
            >
              Place Order
            </Button>
          </Col>
        </Row>
      </Card>

      {/* REVIEW SECTION */}
<h2 className="text-one">
        REVIEWS
      </h2>

      <Row className="g-5">
        {/* LEFT */}

        <Col md={6}>
          {/* RATING BAR */}

          <div className="mb-5">
            <Row className="align-items-center mb-3">
              <Col xs={2}>5 ★</Col>

              <Col xs={8}>
                <ProgressBar
                  now={averageRating * 20}
                 className="colors"
                />
              </Col>

              <Col xs={2}>
                {averageRating}
              </Col>
            </Row>
          </div>

          {/* RECENT FEEDBACK */}

          <h3 className="mb-4 recent-feedback">
            Recent Feedbacks
          </h3>

          {reviews.map((item) => (
            <Card
              key={item._id}
              className="mb-3 shadow-sm"
            >
              <Card.Body>
                <div className="d-flex gap-3">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    alt="user"
                    width="70"
                    height="70"
                    className="rounded-circle"
                  />

                  <div className="w-100">
                    <div className="d-flex justify-content-between">
                      <h5>{item.name}</h5>

                      <div>
                        {[...Array(item.rating)].map(
                          (_, i) => (
                            <span
                              key={i}
                              style={{
                                color: "green",
                                fontSize: "20px",
                              }}
                            >
                              ★
                            </span>
                          )
                        )}
                      </div>
                    </div>

                    <p className="text-muted mb-0">
                      {item.review}
                    </p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
        </Col>

        {/* RIGHT */}

        <Col md={6}>
          {/* OVERALL RATING */}

          <Card className="bg-light border-0 text-center p-5 mb-5 shadow-sm">
            <h1 className="overall-rating fw-bold">
              {averageRating || 0}
            </h1>

            <div className="mb-3">
              {[...Array(
                Math.round(averageRating)
              )].map((_, i) => (
                <span
                  key={i}
                  style={{
                    color: "green",
                    fontSize: "25px",
                  }}
                >
                  ★
                </span>
              ))}
            </div>

            <p className="text-muted">
              {reviews.length} Ratings
            </p>
          </Card>

          {/* ADD REVIEW */}

          <Card className="shadow-sm border-0 p-4">
            <h3 className="mb-4">
              Add a Review
            </h3>

            <Form onSubmit={submitReview}>
              {/* RATING */}

              <Form.Group className="mb-4">
                <Form.Label>
                  Add Your Rating *
                </Form.Label>

                <div>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() =>
                        setRating(star)
                      }
                      style={{
                        cursor: "pointer",
                        color:
                          star <= rating
                            ? "green"
                            : "gray",

                        fontSize: "30px",
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </Form.Group>

              {/* NAME */}

              <Form.Group className="mb-3">
                <Form.Label>
                  Name *
                </Form.Label>

                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                />
              </Form.Group>

              {/* EMAIL */}

              <Form.Group className="mb-3">
                <Form.Label>
                  Email *
                </Form.Label>

                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />
              </Form.Group>

              {/* REVIEW */}

              <Form.Group className="mb-4">
                <Form.Label>
                  Write Review *
                </Form.Label>

                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Write here..."
                  value={reviewText}
                  onChange={(e) =>
                    setReviewText(
                      e.target.value
                    )
                  }
                />
              </Form.Group>

              <Button
                type="submit"
                variant="success"
                className="w-100"
              >
                Submit Review
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Order_summary;