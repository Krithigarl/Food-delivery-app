import React, { useState, useEffect } from "react";
import { Form, Button, Card, Container, Row, Col, Table } from "react-bootstrap";
import axios from "axios";
import { FaPlus } from "react-icons/fa";



const AddFood = () => {
  const [foods, setFoods] = useState([]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
  });

  // Handle input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Fetch foods
  const fetchFoods = () => {
    axios
      .get("http://localhost:5000/api/admin/foods", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then((res) => setFoods(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:5000/api/admin/add-food",
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      )
      .then(() => {
        alert("Food Added ✅");

        // reset form
        setForm({
          name: "",
          price: "",
          image: "",
        });

        fetchFoods(); // refresh list
      })
      .catch((err) => console.log(err));
  };
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false)
  return (
    <Container className="mt-5">
      <Row>
        <Col lg={10}>
      <Form className="d-flex w-75 my-4 mx-5 ">
      
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
              </Col>
              <Col lg={2}>
      <Button onClick={() => setOpen(true)} className="food-btn border-0 mt-2"><FaPlus/></Button>
      <Button className="food-btn1 text-black border-0 mt-3"><i className="uil uil-trash-alt "></i></Button>
      </Col>
      </Row>
      {open &&
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="shadow p-4">
              <h3 className="text-center mb-4">Add Food Item</h3>

              <Form onSubmit={() => { handleSubmit(), setOpen(false) }}>
                {/* Name */}
                <Form.Group className="mb-3">
                  <Form.Label>Food Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* Price */}
                <Form.Group className="mb-3">
                  <Form.Label>Price (₹)</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* Category */}
                <Form.Group className="mb-3">
                  <Form.Label>Images</Form.Label>
                  <Form.Control
                    type="text"
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Button type="submit" className="w-100">
                  Add Food
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      }
      {/* Food List */}
      <div className="mt-4">
        <h4>Food List</h4>


        <Table bordered className="text-black bg-white text-center border-4">
          <tr> 
            
            <th className="p-4">Food</th>
            <th>Name</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
          {foods.map((f) => (
            <tr key={f._id}>
            
              <th><img src={f.image} alt="" width={100} height={100} /></th>
              <th>{f.name}</th>
              <th>{f.price}</th>
              <th>Status</th>
            </tr>
          ))}
        </Table>

      </div>
    </Container>
  );
};

export default AddFood;