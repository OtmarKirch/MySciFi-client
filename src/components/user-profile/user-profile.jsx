import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";

export const UserProfile = ({ user, onLoggedOut }) => {
  const [newUsername, setNewUsername] = useState("");
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newBirthday, setNewBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(event.value);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title className="text-center">User Profile</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username: {user.Username}</Form.Label>
              <Form.Control
                type="text"
                aria-label="For updating put new username here"
                value={newUsername}
                onChange={(e) => {
                  setNewUsername(e.target.value);
                }}
                minLength={9}
              />
            </Form.Group>
            <Form.Group controlId="formName">
              <Form.Label>Name: {user.name}</Form.Label>
              <Form.Control
                type="text"
                aria-label="For updating put new name here"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email: {user.email}</Form.Label>
              <Form.Control
                type="email"
                aria-label="For updating put new email here"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Set new password: </Form.Label>
              <Form.Control
                type="password"
                aria-label="For updating put new password here"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Group>

            <Button type="submit" className="mt-3 w-100" variant="primary">
              Update
            </Button>
          </Form>
          <Button
            onClick={() => {
              onLoggedOut();
            }}
          >
            Log out
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};
