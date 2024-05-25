import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

import '../App.css'; // Make sure this imports your styles

const NavBar = () => {
    const { logout } = useLogout();
    const navigate = useNavigate();

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            logout();
            navigate('/');
        }
    };

    const { user } = useAuthContext();

  return (
    <Navbar expand="lg" className="navbar-custom">
        { user && user.user.role == "volunteer" ? (
            <Container>
                <Navbar.Brand href="/home">Pango</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/profile/volunteer" className="nav-link-custom">Profile</Nav.Link>
                    <Nav.Link href="/events/volunteer" className="nav-link-custom">Events</Nav.Link>
                    <Nav.Link onClick={handleLogout} className="nav-link-custom">Logout</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        ) : user && user.user.role == "organisation" ? (
            <Container>
                <Navbar.Brand href="/profile/org">Pango</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/profile/org">Profile</Nav.Link>
                    <Nav.Link href="/events/org">Events</Nav.Link>
                    <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        ) : (
            <Container>
                <Navbar.Brand href="/home">Pango</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/selectUserType">Login/Signup</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        )}
    </Navbar>
  );
}

export default NavBar;
