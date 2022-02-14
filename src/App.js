import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import routes from "./config/routes";

// containers
import Home from "./containers/Home/Home";
import Offer from "./containers/Offer/Offer";
import NotFoundPage from "./containers/NotFoundPage/NotFoundPage";

// Components
import Header from "./components/Header/Header";

// CSS
import "./App.css";

// ICONS
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch);

function App() {
  // STATES
  const [token, setToken] = useState(Cookies.get("token") || null); // stay connected if user refresh the page or leave it
  const [modalSignupIsOpen, setSignupIsOpen] = useState(false);
  const [modalLoginIsOpen, setLoginIsOpen] = useState(false);

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
      />
      <Routes>
        <Route path={routes.HOME} element={<Home />} />
        <Route path={routes.OFFER} element={<Offer />} />
        <Route path={routes.NOTFOUNDPAGE} element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
