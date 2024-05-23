import React from "react";
import { useState } from "react";

export const LoginView = ({ onLoggedIn, User }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      Username: username,
      Password: password,
    };
    const loginUrl = "https://sci-fi-app.onrender.com/login?Username=" + data.Username + "&" + "Password=" + data.Password

    //https://sci-fi-app.onrender.com/login?Username=MikeS&Password=3nd93endjs

    fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      /* body: JSON.stringify(data),
      params: {
        Username: "MikeS",
        Password: "3nd93endjs"
      } */
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
        console.log(User)
        if (data.user) {
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user");
        }
        console.log(User)
      })
      .catch((e) => {
        alert("Something went wrong in the client app");
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          ></input>
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
        </label>
        <button type="submit">Log In</button>
      </form>
    </>
  );
};
