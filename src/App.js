import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// containers
import Home from "./containers/Home/Home";
import Offer from "./containers/Offer/Offer";

// Components
import Header from "./components/Header/Header";

// CSS
import "./App.css";

// ICONS
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch);

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offer/:id" element={<Offer />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
