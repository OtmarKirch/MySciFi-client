import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./navigation-bar.scss";

export const NavigationBar = ({ user, onLoggedOut }) => {
  // Return expandable navigation bar
  return (
    <Navbar expand="lg" className="mb-2 navbackground navbar-dark">
      <Container>
        <Link to="/">
          <Navbar.Brand href="">mySciFiApp</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
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
            {user && 
            (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/favoriteMovies">
                  Favorite Movies
                </Nav.Link>
                <Nav.Link as={Link} to="/user">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>
                  Logout
                  </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

// The propTypes for the NavigationBar component
PropTypes.propTypes = {
  user: PropTypes.object,
  onLoggedOut: PropTypes.func,
};