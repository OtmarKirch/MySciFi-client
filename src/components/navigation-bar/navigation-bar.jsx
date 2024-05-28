import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LogoutButton } from "../logout-button/logout-button";

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Link to="/">
          <Navbar.Brand href="">mySciFiApp</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
        {/* <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
              </>
            )}
          </Nav> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
