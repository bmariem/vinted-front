// Lib
import React, { useState, useEffect } from "react";
import axios from "../../config/api";
import { useParams } from "react-router-dom";
import Carousel from "react-multi-carousel";

// Components
import Spinner from "../../components/Spinner/Spinner";

// img
import DefaultAvatar from "../../assets/images/default-avatar.png";

//CSS
import "./Offer.css";
import "react-multi-carousel/lib/styles.css";

const Offer = () => {
  // récupérer l'id de l'article envoyé lors de la navigation
  const { id } = useParams();

  // STATES
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/offer/${id}`);

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [id]);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="Offer">
      {/* get all infos about an offer  */}
      <div className="offer">
        <div className="container">
          {/* deal with multiple images in carousel */}
          {data.product_pictures && data.product_pictures.length > 1 ? (
            <div className="offer-pictures">
              {data.product_pictures.length > 1 && (
                <Carousel
                  responsive={responsive}
                  infinite={true}
                  autoPlaySpeed={1000}
                  customTransition="all .5"
                  showDots={true}
                >
                  {data.product_pictures.map((picture) => {
                    return (
                      <img
                        key={picture.asset_id}
                        src={picture.secure_url}
                        className="carousel-img"
                        alt="product"
                      />
                    );
                  })}
                </Carousel>
              )}
            </div>
          ) : (
            <>
              {/* display one image for offer */}
              <div className="offer-picture">
                <img
                  className="one-picture"
                  src={data.product_image.secure_url}
                  alt={data.product_name}
                />
              </div>
            </>
          )}
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
              {data.product_name && (
                <p className="offer-title"> {data.product_name}</p>
              )}
              {data.product_description && (
                <p className="offer-desc"> {data.product_description}</p>
              )}
              <div className="offer-owner">
                {data.owner.account.avatar ? (
                  <img
                    src={data.owner.account.avatar.secure_url}
                    alt={data.owner.account.username}
                  />
                ) : (
                  <img src={DefaultAvatar} alt="default" />
                )}

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
