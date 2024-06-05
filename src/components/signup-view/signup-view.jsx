import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault()

    const data = {
        Username: username,
        name: name,
        email: email,
        Password: password,
        //Birthday: birthday
    }
    console.log(data)

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
            window.location.reload();

        }else{
            alert("Signup failed")
        }
    })

  };

  return (
    <Card>
      <Card.Body>
        <Card.Title className="mb-3 text-center">New Users</Card.Title>
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          aria-label="Put in your username"
          aria-required="true"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          required
          minLength="5"
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Name:</Form.Label>
        <Form.Control
          type="text"
          aria-label="Put in your name"
          aria-required="true"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          required
          minLength="5"
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          aria-label="Put in your email"
          aria-required="true"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
          minLength="5"
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control
        type="text"
        aria-label="Put in your Password"
        aria-required="true"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        required
        minLength="5"
        >
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Birthday</Form.Label>
        <Form.Control
          type="date"
          aria-label="Put in your Birthday"
          aria-required="false"
          value={birthday}
          onChange={(e)=>setBirthday(e.target.value)}
        ></Form.Control>
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
