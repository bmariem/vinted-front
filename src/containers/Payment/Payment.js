// LIB
import React from "react";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Components
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import ProductSummary from "../../components/ProductSummary/ProductSummary";

// CSS
import "./Payment.css";

const Payment = () => {
  const location = useLocation();
  const stripePromise = loadStripe(
    "pk_test_51KTTQKJ0o0kwjpd11JooJGVtOLtOVfMW5lEyYQZkox3vx6XGLXavICzYyI5PF9BtN8139IPg3UW17gyPnkEprIU600fGQh6Qea"
  );
  const { productName, totalPrice, protectionFees, shippingFees, price } =
    location.state;

  return (
    <div className="payment">
      <div className="payment-container">
        <div className="payment-card">
          <div className="content">
            <p className="title">Commande</p>
            <div className="order">
              <span> {productName}</span>
              <span>{totalPrice} €</span>
            </div>
            <p className="title">Paiement</p>
            <Elements stripe={stripePromise}>
              <CheckoutForm productName={productName} totalPrice={totalPrice} />
            </Elements>
          </div>
        </div>

        <ProductSummary
          price={price}
          protectionFees={protectionFees}
          shippingFees={shippingFees}
          totalPrice={totalPrice}
        />
      </div>
    </div>
  );
};

export default Payment;
