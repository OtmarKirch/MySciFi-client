import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import propTypes from "prop-types";

export const UserProfile = ({
  user,
  token,
  onLoggedOut,
  importNewUserData,
}) => {
  const [newUsername, setNewUsername] = useState("");
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const requestData = {};
    if (newUsername !== "") requestData.Username = newUsername;
    if (newName !== "") requestData.name = newName;
    if (newEmail !== "") requestData.email = newEmail;

    console.log(JSON.stringify(requestData));

    // Send a request to the server to update the user details
    if (Object.keys(requestData).length != 0) {
      const dbUrl =
        "http://3.70.138.183/users/newdetails";
      fetch(dbUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            localStorage.setItem("user", JSON.stringify(data));
            importNewUserData(data);
          }
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const handleSetNewPassword = (event) => {
    event.preventDefault();

    const requestData = { Password: newPassword };

    const confirmed = window.confirm("Please confirm to change your password");

    // Send a request to the server to update the user password
    if (confirmed) {
      const dbUrl =
        "https://quiet-bastion-19832-9b36523e0b42.herokuapp.com/users/newpassword";
      fetch(dbUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      })
        .then(console.log("Password changed."))
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const handleDeleteUser = (event) => {
    event.preventDefault();
    const requestData = { Username: user.Username };

    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This is irreversible!"
    );

    if (confirmed) {
      onLoggedOut();
      // Send a request to the server to delete the user account
      fetch("https://sci-fi-app.onrender.com/users/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      }).then(console.log("Account deleted."));
    }
  };

  // Return a form to allow users to update their details
  return (
    <>
      <Card>
        <Card.Body className="mb-1">
          <Card.Title className="text-center">User Profile</Card.Title>
          <Card.Text>
            For updating your details, fill out what you wish to update.
          </Card.Text>
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
                minLength={5}
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

            <Button type="submit" className="mt-3 w-100" variant="primary">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <Card className="mt-2 mb-2">
        <Card.Body>
          <Card.Title className="text-center">Set New Password</Card.Title>
          <Form onSubmit={handleSetNewPassword}>
            <Form.Group controlId="formNewPassword">
              <Form.Label>Set new password: </Form.Label>
              <Form.Control
                type="password"
                aria-label="For updating put new password here"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" className="mt-3 w-100" variant="primary">
              Set New Password
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="d-flex justify-content-center">
        <Button
          className="col-6 m-3"
          variant="primary"
          onClick={() => {
            onLoggedOut();
          }}
        >
          Log out
        </Button>
      </div>
      <div className="d-flex justify-content-center">
        <Button
          className="col-6 m-2"
          variant="danger"
          onClick={(e) => {
            handleDeleteUser(e);
          }}
        >
          Delete profile
        </Button>
      </div>
    </>
  );
};

// PropTypes for the UserProfile component
propTypes.UserProfile = {
  user: propTypes.object,
  token: propTypes.string,
  onLoggedOut: propTypes.func,
  importNewUserData: propTypes.func,
};
