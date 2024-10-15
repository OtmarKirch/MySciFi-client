import React from "react";
import { useState } from "react";
import {Form,Button,Card} from "react-bootstrap"
import {Link} from "react-router-dom"
import PropTypes from "prop-types";


export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const loginData = { Username: username, Password: password };

    // Send a request to the server for authentication
    const dbUrl = "http://3.70.138.183/login"
    fetch(dbUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",  
      },
      body: JSON.stringify(loginData),
      
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);

        if (data.user) {
          // Save the token and user in local storage
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          // Log in user
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        alert("Something went wrong in the client app");
      });
  };

  // Return a form to allow users to log in
  return (
    <Card>
      <Card.Body>
      <Card.Title className="mb-3 text-center">Registered Users</Card.Title>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            aria-label="Put in your username"
            aria-required="true"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="5"
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="text"
            aria-label="Put in your password"
            aria-required="true"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="5"
          />
        </Form.Group>

        <Button type="submit" className="mt-3 w-100" variant="primary">
          Log In
        </Button>
        <Link to="/signup">
                <Button variant="link" className="mt-3">Sign up here</Button>
        </Link>
      </Form>
      </Card.Body>
      <br />
      
    </Card>
  );
};

// The propTypes for the LoginView component
LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};