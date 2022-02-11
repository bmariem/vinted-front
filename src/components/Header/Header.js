import React from "react";
import { Link, useNavigate } from "react-router-dom";

// Assets
import logo from "../../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// CSS
import "./Header.css";

const Header = ({ token, setUser }) => {
  const navigate = useNavigate();

  const handlelogoutClick = () => {
    setUser(null);
    // Redirection vers home page
    navigate("/");
  };

  return (
    <div className="header-container">
      <Link to={"/"}>
        <img className="header-logo" src={logo} alt="vinted" />
      </Link>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Recherche des articles"
        />
        <FontAwesomeIcon icon="search" className="search-input-icon" />
      </div>

      {token ? (
        <button className="button-logout" onClick={handlelogoutClick}>
          Se déconnecter
        </button>
      ) : (
        <div>
          <Link
            className="btn button-login-signup button-signup"
            to={"/Signup"}
          >
            S'inscrire
          </Link>

          <Link className="btn button-login-signup button-signup" to={"/Login"}>
            Se connecter
          </Link>
        </div>
      )}

      <button className="button-sold">Vends tes articles</button>
    </div>
  );
};

export default Header;
