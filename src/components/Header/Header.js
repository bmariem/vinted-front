import React from "react";
import { Link } from "react-router-dom";

// Assets
import logo from "../../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// CSS
import "./Header.css";

const Header = () => {
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

      <button className="button-logout">Se déconnecter</button>

      <div>
        <button className="header-button button-login-signup button-signup">
          S'inscrire
        </button>
        <button className="header-button button-login-signup">
          Se connecter
        </button>
      </div>
      <button className="header-button button-sold">Vends tes articles</button>
    </div>
  );
};

export default Header;
