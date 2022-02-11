// Lib
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Components
import Spinner from "../Spinner/Spinner";

// CSS
import "./Login.css";

const Login = ({ setUser, setSignupIsOpen, setLoginIsOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLoginSubmit = async (event) => {
    try {
      event.preventDefault();
      setIsLoading(true);

      // Find a User
      // axios.post(URL, data)
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );

      if (response.data.token) {
        // save token in cookies
        setUser(response.data.token);
        setIsLoading(false);

        // Redirect user to home page
        navigate("/");
      } else {
        alert("Une erreur est survenue, veuillez réssayer.");
      }
    } catch (error) {
      console.log("Login Error => ", error.message);

      // error 400 => login with wrong email <=> data.message: "User not found"
      // error 401 => login with wrong password <=> data.error: "Unauthorized"
      console.log("Catch Error => ", error.response);

      if (error.response.status === 400 || error.response.status === 401) {
        setErrorMessage("Adresse e-mail ou mot de passe non valide");
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="login">
      <div className="container">
        <h2 className="title">Se connecter</h2>

        <form onSubmit={handleLoginSubmit} className="login-form">
          <input
            type="email"
            required="required"
            placeholder="Adresse email"
            onChange={(event) => {
              setEmail(event.target.value);
              setErrorMessage("");
            }}
          />

          <input
            type="password"
            required="required"
            placeholder="Mot de passe"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />

          {errorMessage && (
            <span className="error-message">{errorMessage}</span>
          )}

          {isLoading ? (
            <Spinner />
          ) : (
            <button
              className="btn"
              disabled={isLoading ? true : false}
              type="submit"
            >
              Se connecter
            </button>
          )}
        </form>

        <p
          className="signup-link"
          onClick={() => {
            // Close Login Modal
            setLoginIsOpen(false);
            // Open Signup Modal
            setSignupIsOpen(true);
          }}
        >
          Pas encore de compte ? Inscris-toi !
        </p>
      </div>
    </div>
  );
};

export default Login;
