import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// Assets
import logo from "../../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// CSS
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  const handlelogoutClick = () => {
    Cookies.remove("token");
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

      {Cookies.get("token") ? (
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
