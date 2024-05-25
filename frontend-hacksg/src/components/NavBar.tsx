import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.css';

import { useAuthContext } from '../hooks/useAuthContext';

const NavBar = () => {

  const { user } = useAuthContext();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
        { user && user.role == "volunteer" ? (
            <Container>
                <Navbar.Brand href="/">frontend</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/profile/volunteer">Profile</Nav.Link>
                    <Nav.Link href="/events/volunteer">Events</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        ) : user && user.role == "org" ? (
            <Container>
                <Navbar.Brand href="/">frontend</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/profile/org">Profile</Nav.Link>
                    <Nav.Link href="/events/org">Events</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        ) : (
            <Container>
                <Navbar.Brand href="/">frontend</Navbar.Brand>
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