import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault()

    const data = {
        name: name,
        email: email,
        Password: password,
        Username: username,
    }

    // Send a request to the server for registering
    const dbUrl = "https://quiet-bastion-19832-9b36523e0b42.herokuapp.com/users/register"
    fetch(dbUrl, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response)=> {
      
        if (response.ok) {
            alert("Signup successful");
            window.location.href = "/login";

        }
         else{
             response.text().then((text) => {
               console.log(text);
            alert("Signup failed: " + text);})
           }
         
    })

  };

  // Return a form to allow users to sign up
  return (
    <Card>
      <Card.Body>
        <Card.Title className="mb-3 text-center">New Users</Card.Title>
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Username (min 5 characters)</Form.Label>
        <Form.Control
          type="text"
          aria-label="Put in your username (min 5 characters)"
          aria-required="true"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          required
          minLength="5"
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Name (min 5 characters)</Form.Label>
        <Form.Control
          type="text"
          aria-label="Put in your name (min 5 characters)"
          aria-required="true"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          required
          minLength="5"
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Email (valid email address)</Form.Label>
        <Form.Control
          type="email"
          aria-label="Put in your email address (valid email address)"
          aria-required="true"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
          minLength="5"
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Password (min 8 characters)</Form.Label>
        <Form.Control
        type="text"
        aria-label="Put in your Password (min 8 characters)"
        aria-required="true"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        required
        minLength="8"
        >
        </Form.Control>
      </Form.Group>
      <Button
      variant="primary"
      type="submit"
      className="mt-3 w-100"
      >Register</Button>
    </Form>
    </Card.Body>
    </Card>
    
  );
};
