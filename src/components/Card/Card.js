import React from "react";
import { Link } from "react-router-dom";

// img
import DefaultAvatar from "../../assets/images/default-avatar.png";

// CSS
import "./Card.css";

const Card = ({ offer }) => {
  return (
    <Link to={`/offer/${offer._id}`} className="card-container">
      <div className="card-avatar">
        {offer.owner.account.avatar ? (
          <img
            src={offer.owner.account.avatar.secure_url}
            alt={offer.owner.account.username}
          />
        ) : (
          <img src={DefaultAvatar} alt="default" />
        )}
        <span>{offer.owner.account.username}</span>
      </div>
      <div className="card-product">
        {offer.product_image && (
          <img
            src={offer.product_image.secure_url}
            alt={offer.owner.account.username}
          />
        )}
        {(offer.product_price || offer.product_details) && (
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
        )}
      </div>
    </Link>
  );
};

export default Card;
