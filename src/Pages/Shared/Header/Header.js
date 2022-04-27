import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../../firebase.init";
import logo from "../../../logos/logo.png";
import "./Header.css";

const Header = () => {
  const [user, loading, error] = useAuthState(auth);
  console.log(user)
  const [white, setWhite] = useState(false);
  const navigate = useNavigate();
  const handleNavbarColor = () => {
    if (window.scrollY > 80) {
      setWhite(true);
    } else {
      setWhite(false);
    }
  };
  const [hideNavbar, setHideNavbar] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/register") {
      setHideNavbar(true);
    } else {
      setHideNavbar(false);
    }
  }, [location]);
  window.addEventListener("scroll", handleNavbarColor);
  return (
    <div>
      <Navbar
        fixed="top"
        className={`${white ? "navbar-top-bg-white" : "navbar-top"} ${
          hideNavbar ? "d-none" : ""
        }`}
        expand="lg"
      >
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img style={{ width: "150px" }} src={logo} alt="Brand Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/donation">
                Donation
              </Nav.Link>
              <Nav.Link as={Link} to="/events">
                Events
              </Nav.Link>
              <Nav.Link as={Link} to="/blog">
                Blog
              </Nav.Link>
              {user ? (
                <>
                  <NavDropdown title={user?.displayName} id="basic-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/register/admin">
                      Register as admin
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/profile">
                      Your Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      Something
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => signOut(auth)}>
                      Sign Out
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/register")}
                    className="nav-special bg-primary"
                  >
                    Register
                  </button>
                  <button
                    onClick={() => navigate("/register/admin")}
                    className="nav-special bg-dark"
                  >
                    Admin
                  </button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
