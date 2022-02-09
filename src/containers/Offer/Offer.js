// Lib
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// Components
import Spinner from "../../components/Spinner/Spinner";

//CSS
import "./Offer.css";

const Offer = () => {
  // récupérer l'id de l'article envoyé lors de la navigation
  const params = useParams();

  // STATES
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${params.id}`
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [params.id]);

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="Offer">
      {/* Récuperer toutes les infos d'une offre  */}
      <div className="offer">
        <div className="container">
          <div className="offer-picture">
            <img src={data.product_image.secure_url} alt={data.product_name} />
          </div>
          <div className="offer-description">
            <div>
              <span className="offer-price">{data.product_price} €</span>
              <ul className="offer-details">
                {data.product_details.map((detail, index) => {
                  const keys = Object.keys(detail);
                  return (
                    <li key={index}>
                      <span>{keys[0]}</span>
                      <span>{detail[keys[0]]}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <p className="offer-title"> {data.product_name}</p>
              <p className="offer-desc"> {data.product_description}</p>
              <div className="offer-owner">
                <img
                  src={data.owner.account.avatar.secure_url}
                  alt={data.owner.account.username}
                />
                <span>{data.owner.account.username}</span>
              </div>
            </div>
            <button className="btn">Acheter</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
