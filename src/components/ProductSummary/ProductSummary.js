// LIB
import React from "react";

// CSS
import "./ProductSummary.css";

const ProductSummary = ({
  price,
  protectionFees,
  shippingFees,
  totalPrice,
}) => {
  return (
    <div className="payment-card summary">
      <div className="resume">
        <div className="title">Résumé de la commande</div>
        <div className="content">
          <ul>
            <li>
              Commande <span>{price} €</span>
            </li>
            <li>
              Frais protection acheteurs <span>{protectionFees} €</span>
            </li>
            <li>
              Frais de port <span>{shippingFees} €</span>
            </li>
            <li>
              Total <span>{totalPrice} €</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductSummary;
