// Lib
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// Components
import Spinner from "../Spinner/Spinner";

// CSS
import "./Signup.css";

const Signup = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignupSubmit = async (event) => {
    try {
      event.preventDefault();
      setIsLoading(true);
      const response = await axios.post(
        // create a new User
        // axios.post(URL, data)
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          username: username,
          email: email,
          password: password,
          newsletter: newsletter,
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
      console.log("Signup Error => ", error.message);

      // error 409 => conflict
      console.log("Catch Error => ", error.response); //data: {message: 'This email already has an account'}
      if (error.response.status === 409) {
        setErrorMessage("Cette adresse e-mail est déjà attribué à un compte");
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="signup">
      <div className="container">
        <h2 className="title">S'inscrire</h2>

        <form onSubmit={handleSignupSubmit} className="signup-form">
          <input
            value={username}
            type="text"
            required="required"
            placeholder="Nom d'utilisateur"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />

          <input
            value={email}
            type="email"
            required="required"
            placeholder="Adresse email"
            onChange={(event) => {
              setEmail(event.target.value);
              setErrorMessage("");
            }}
          />

          <input
            value={password}
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

          <div className="newsletter-checkbox">
            <div>
              <input
                type="checkbox"
                className="checkbox"
                onChange={(event) => {
                  setNewsletter(event.target.checked);
                }}
              />
              <span>S'inscrire à notre newsletter</span>
            </div>
            <p>
              En m'inscrivant je confirme avoir lu et accepté les Termes &
              Conditions et Politique de Confidentialité de Vinted. Je confirme
              avoir au moins 18 ans.
            </p>
          </div>

          {isLoading ? (
            <Spinner />
          ) : (
            <button
              className="btn"
              disabled={isLoading ? true : false}
              type="submit"
            >
              S'inscrire
            </button>
          )}
        </form>

        {/* <Link className="login-link" to="/Login">
          Tu as déjà un compte ? Connecte-toi !
        </Link> */}
      </div>
    </div>
  );
};

export default Signup;
