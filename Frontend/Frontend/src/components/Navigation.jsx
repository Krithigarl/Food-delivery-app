import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaUser, FaRegUserCircle, FaShoppingCart } from "react-icons/fa";

function Navigation() {
    const [inputValue, setInputValue] = useState("");
    const [showBox, setShowBox] = useState(false);

    const username = localStorage.getItem("username");
    const navigate = useNavigate();

    const handleUserClick = () => {
        if (username) {
            setShowBox(!showBox);
        } else {
            navigate("/login");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("username");
        setShowBox(false);
        navigate("/login");
    };
const location = useLocation();
    return (
        <>
  {location.pathname !== "/admin/dashboard" &&
     location.pathname !== "/login" &&
     location.pathname !== "/register" && (
        <Navbar expand="lg"  variant="dark" sticky="top">
            <Container fluid>
                
                {/* Brand */}
                <Navbar.Brand>Food Express</Navbar.Brand>

                {/* Toggle Button (IMPORTANT) */}
                <Navbar.Toggle aria-controls="navbarScroll" />

                {/* Collapse */}
                <Navbar.Collapse id="navbarScroll">
                    
                    {/* Left Menu */}
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/dishes">Dishes</Nav.Link>
                        <Nav.Link href="/contact">Contact</Nav.Link>
                    </Nav>

                    {/* Right Side */}
                    <div className="d-flex align-items-center gap-3 flex-column flex-lg-row mt-3 mt-lg-0">

                        {/* Search */}
                        <Form>
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
                        </Form>

                        {/* User */}
                        <div className="position-relative">
                            <div onClick={handleUserClick} style={{ cursor: "pointer" }}>
                                {username ? (
                                    <FaUser size={22} />
                                ) : (
                                    <FaRegUserCircle size={24} />
                                )}
                            </div>

                            {showBox && (
                                <div className="user-box">
                                    <p className="username">Hello, {username}</p>
                                    <button className="logout-btn" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Cart */}
                        <FaShoppingCart size={22} style={{ cursor: "pointer" }} />
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )}
        </>

    );
}

export default Navigation;