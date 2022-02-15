import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";

// Assets
import logo from "../../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Components
import Signup from "../Signup/Signup";
import Login from "../Login/Login";
import SortByPrice from "../SortByPrice/SortByPrice";

// CSS
import "./Header.css";

const Header = ({
  token,
  setUser,
  modalSignupIsOpen,
  setSignupIsOpen,
  modalLoginIsOpen,
  setLoginIsOpen,
  handleSearch,
  sortByPrice,
  setSortByPrice,
}) => {
  const navigate = useNavigate();

  const handlelogoutClick = () => {
    setUser(null);
    // Redirection vers home page
    navigate("/");
  };

  const openSignupModal = () => {
    setSignupIsOpen(true);
  };

  const closeSignupModal = () => {
    setSignupIsOpen(false);
  };

  const openLoginModal = () => {
    setLoginIsOpen(true);
  };

  const closeLoginModal = () => {
    setLoginIsOpen(false);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const handlePublishOfferClick = (token) => {
    if (token) {
      // user authenticated => navigate to publish page
      navigate("/offer/publish");
    } else {
      // user not authenticated => set loginModal on true & redirect to targetUrl
      setLoginIsOpen(true);
      navigate("/?target_url=/offer/publish");
    }
  };

  useEffect(() => {
    Modal.setAppElement(".header-container");
  }, []);

  return (
    <header className="header-container">
      <Link to={"/"}>
        <img className="header-logo" src={logo} alt="vinted" />
      </Link>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Recherche des articles"
          onChange={(event) => handleSearch(event)}
        />
        <FontAwesomeIcon icon="search" className="search-input-icon" />
      </div>

      <div className="price-filter">
        <SortByPrice
          sortByPrice={sortByPrice}
          setSortByPrice={setSortByPrice}
        />
        {/* <MinMaxPrice values={values} setMinMaxValues={setMinMaxValues} /> */}
      </div>

      {token ? (
        <button className="button-logout" onClick={handlelogoutClick}>
          Se déconnecter
        </button>
      ) : (
        <div>
          {/* open modal to signup */}
          <button
            className="button-login-signup button-signup"
            onClick={openSignupModal}
          >
            S'inscrire
          </button>

          <Modal
            isOpen={modalSignupIsOpen}
            onRequestClose={closeSignupModal}
            style={customStyles}
            contentLabel="signup Modal"
          >
            <button onClick={closeSignupModal} className="close-modal">
              X
            </button>
            <Signup
              setUser={setUser}
              setSignupIsOpen={setSignupIsOpen}
              setLoginIsOpen={setLoginIsOpen}
            />
          </Modal>

          {/* open modal to signup */}
          <button
            className="button-login-signup button-signup"
            onClick={openLoginModal}
          >
            Se connecter
          </button>
          <Modal
            isOpen={modalLoginIsOpen}
            onRequestClose={closeLoginModal}
            style={customStyles}
            contentLabel="Login Modal"
          >
            <button onClick={closeLoginModal} className="close-modal">
              X
            </button>
            <Login
              setUser={setUser}
              setSignupIsOpen={setSignupIsOpen}
              setLoginIsOpen={setLoginIsOpen}
            />
          </Modal>
        </div>
      )}

      <button
        className="button-sold"
        onClick={() => handlePublishOfferClick(token)}
      >
        Vends tes articles
      </button>
    </header>
  );
};

export default Header;
