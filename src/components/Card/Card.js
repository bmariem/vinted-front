import React from "react";
import { Link } from "react-router-dom";

// CSS
import "./Card.css";

const Card = ({ offer }) => {
  return (
    <Link to={`/offer/${offer._id}`} className="card-container">
      <div className="card-avatar">
        <img
          src={offer.owner.account.avatar.secure_url}
          alt={offer.owner.account.username}
        />
        <span>{offer.owner.account.username}</span>
      </div>
      <div className="card-product">
        <img
          src={offer.product_image.secure_url}
          alt={offer.owner.account.username}
        />
        <div className="card-product-infos">
          <span className="price">{offer.product_price} €</span>
          {offer.product_details.map((detail, index) => {
            return (
              <div key={index}>
                <span className="marque">{detail.MARQUE}</span>
                <span className="size">{detail.TAILLE}</span>
              </div>
            );
          })}
        </div>
      </div>
    </Link>
  );
};

export default Card;
