import React, { useState } from "react";
import { Container, Button, Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import Dashbord from "./Dashbord";
import Orderadmin from "./Orderadmin";
import Useradmin from "./Useradmin";
import AddFood from "./Addfoodform";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("dashboard");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Page switch
  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashbord />;
      case "foods":
        return <AddFood />;
      case "orders":
        return <Orderadmin />;
      case "users":
        return <Useradmin />;
      default:
        return <Dashbord />;
    }
  };

  return (
    <>
      {/* 🔹 Top Navbar */}
      <Navbar  variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand>Food Admin</Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-nav" />

          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                onClick={() => setActivePage("dashboard")}
                className={activePage == "dashboard" ? "admin-nav" : ""}
              >
                Dashboard
              </Nav.Link>

              <Nav.Link
                onClick={() => setActivePage("foods")}
                className={activePage == "foods" ? "admin-nav" : ""}
              >
                Foods
              </Nav.Link>

              <Nav.Link
                onClick={() => setActivePage("orders")}
                className={activePage == "orders" ? "admin-nav" : ""}
              >
                Orders
              </Nav.Link>

              <Nav.Link
                onClick={() => setActivePage("users")}
                className={activePage == "users" ? "admin-nav" : ""}
              >
                Users
              </Nav.Link>
            </Nav>

            <Button variant="outline-light" onClick={handleLogout}>
              Logout
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* 🔹 Page Content */}
      <Container className="mt-4">
        {renderPage()}
      </Container>
    </>
  );
};

export default AdminDashboard;