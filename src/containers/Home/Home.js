// Lib
import React, { useState, useEffect } from "react";
import axios from "axios";

// Components
import Spinner from "../../components/Spinner/Spinner";
import Card from "../../components/Card/Card";

import imgEffect from "../../assets/images/tear.svg";

// CSS
import "./Home.css";

const Home = () => {
  // STATES
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="Home">
      <div className="home-bg-img">
        <img src={imgEffect} alt="forme" className="home-forme" />
        <div>
          <div className="home-msg">
            Prêts à faire du tri dans vos placards ?
            <button>Commencer à vendre</button>
          </div>
        </div>
      </div>

      <div className="cards">
        {/* Récuperer toutes offres */}
        {data.offers.map((offer) => {
          return <Card offer={offer} key={offer._id} />;
        })}
      </div>
    </div>
  );
};

export default Home;
