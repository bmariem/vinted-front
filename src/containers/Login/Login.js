// Lib
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

// Components
import Spinner from "../../components/Spinner/Spinner";

// CSS
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLoginSubmit = async (event) => {
    try {
      event.preventDefault();
      setIsLoading(true);
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );

      if (response.data.token) {
        Cookies.set("token", response.data.token);
        setIsLoading(false);
        navigate("/");
      } else {
        alert("Une erreur est survenue, veuillez réssayer.");
      }
    } catch (error) {
      setErrorMessage("Adresse e-mail ou mot de passe non valide");
      setIsLoading(false);
      console.log(error.message);
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

        <Link className="signup-link" to="/signup">
          Pas encore de compte ? Inscris-toi !
        </Link>
      </div>
    </div>
  );
};

export default Login;
