import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import routes from "./config/routes";

// containers
import Home from "./containers/Home/Home";
import Offer from "./containers/Offer/Offer";
import Publish from "./containers/Publish/Publish";
import Payment from "./containers/Payment/Payment";
import NotFoundPage from "./containers/NotFoundPage/NotFoundPage";

// Components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

// CSS
import "./App.css";

// ICONS
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faShieldAlt } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch, faShieldAlt);

function App() {
  // STATES
  const [token, setToken] = useState(Cookies.get("token") || null); // stay connected if user refresh the page or leave it
  const [modalSignupIsOpen, setSignupIsOpen] = useState(false);
  const [modalLoginIsOpen, setLoginIsOpen] = useState(false);
  const [title, setTitle] = useState(""); // filter => Search offers by title
  const [sortByPrice, setSortByPrice] = useState("price-asc"); // filter => Sort offers by price

  const handleSearch = (event) => {
    setTitle(event.target.value);
  };

  const setUser = (token) => {
    // if token exists
    if (token) {
      // => save it in the cookies for four days (in the browser session)
      Cookies.set("token", token, { expires: 4 });
    } else {
      // delete token in cookies
      Cookies.remove("token");
    }

    // update the state of token
    setToken(token);
  };

  return (
    <Router>
      <Header
        token={token}
        setUser={setUser}
        modalSignupIsOpen={modalSignupIsOpen}
        setSignupIsOpen={setSignupIsOpen}
        modalLoginIsOpen={modalLoginIsOpen}
        setLoginIsOpen={setLoginIsOpen}
        handleSearch={handleSearch}
        sortByPrice={sortByPrice}
        setSortByPrice={setSortByPrice}
      />
      <Routes>
        <Route
          path={routes.HOME}
          element={
            <Home
              token={token}
              setLoginIsOpen={setLoginIsOpen}
              title={title}
              sortByPrice={sortByPrice}
            />
          }
        />
        <Route path={routes.OFFER} element={<Offer />} />
        <Route path={routes.PUBLISH} element={<Publish token={token} />} />
        <Route path={routes.PAYMENT} element={<Payment token={token} />} />
        <Route path={routes.NOTFOUNDPAGE} element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
