import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Navigation() {
    const [inputValue, setInputValue] = useState("");
    const username = localStorage.getItem("username");
    return (
        <Navbar expand="lg" className="navbar" sticky="top">
            <Container fluid>
                <Navbar.Brand className='brand'>Food Express</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="#action1" active>Home</Nav.Link>
                        <Nav.Link href="#action2">Dishes</Nav.Link>
                        <Nav.Link href="#">
                            Contact us
                        </Nav.Link>
                        {username ? (
                            <p>👤 {username}</p>
                        ) : (
                            <p>Login</p>
                        )}
                    </Nav>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            list="locations"
                            placeholder="Search location"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />

                        <datalist id="locations">
                            <option value="Nagercoil, Kanyakumari" />
                            <option value="Chennai" />
                            <option value="Coimbatore" />
                        </datalist>
                    </Form.Group>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;