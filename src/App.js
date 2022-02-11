import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

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

  const setUser = (token) => {
    // if token exists
    if (token) {
      // => save in the cookies for four days (in the browser session=
      Cookies.set("token", token, { expires: 4 });
    } else {
      // delete token in cookies
      Cookies.remove("token");
    }

    // update the state of toekn
    setToken(token);
  };

  return (
    <Router>
      <Header token={token} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
