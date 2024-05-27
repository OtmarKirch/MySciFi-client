import React from "react";
import { useState } from "react";
import {Form,Button,Card} from "react-bootstrap"

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      Username: username,
      Password: password,
    };
    const loginUrl =
      "https://sci-fi-app.onrender.com/login?Username=" +
      data.Username +
      "&" +
      "Password=" +
      data.Password;

    fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      /* body: JSON.stringify(data),
      params: {
        Username: data.Username,
        Password: data.Password
      } */
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);

        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        alert("Something went wrong in the client app");
      });
  };

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
      </Form>
      </Card.Body>
      <br />
      
    </Card>
  );
};
