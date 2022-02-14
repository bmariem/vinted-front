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
        {offer.product_image && (
          <img
            src={offer.product_image.secure_url}
            alt={offer.owner.account.username}
          />
        )}

        <div className="card-product-infos">
          {offer.product_price && (
            <span className="price">{offer.product_price} €</span>
          )}

          {offer.product_details &&
            offer.product_details.map((detail, index) => {
              return (
                <div key={index}>
                  {detail.MARQUE && (
                    <span className="marque">{detail.MARQUE}</span>
                  )}
                  {detail.TAILLE && (
                    <span className="size">{detail.TAILLE}</span>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </Link>
  );
};

export default Card;
