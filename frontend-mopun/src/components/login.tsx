import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/AuthService";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const formSubmissionHandler = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      // Call the authentication service with username and password
      await AuthService.login(username, password);

      // Update the state to indicate successful login
      setLoggedIn(true);
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login failure
    }
  };

  if (loggedIn) {
    // Redirect to a different route after successful login
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src={require("../images/irishPoll.png")}
          alt="profile-img"
          className="profile-img-card"
        />

        <form onSubmit={formSubmissionHandler}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
