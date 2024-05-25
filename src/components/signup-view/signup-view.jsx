import { useState } from "react";
import { Form, Button } from "react-bootstrap";

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

    fetch("https://sci-fi-app.onrender.com/users/register", {
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
    <>
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
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
          value={birthday}
          onChange={(e)=>setBirthday(e.target.value)}
        ></Form.Control>
      </Form.Group>
      <Button
      variant="primary"
      type="submit"
      >Register</Button>
    </Form>
    </>
    
  );
};
