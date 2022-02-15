// LIB
import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "../../config/api";

// ICONS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// CSS
import "./CheckoutForm.css";

const CheckoutForm = ({ productName, totalPrice }) => {
  const [isPaid, setIsPaid] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handlePaymentSubmit = async (event) => {
    try {
      event.preventDefault();
      // envoie du numéro de carte & Récupérer les données de CB
      const cardElement = elements.getElement(CardElement);

      // valider la carte puis réceptionner le token
      const stripeResponse = await stripe.createToken(cardElement, {
        name: "L'id de l'acheteur",
      });

      // envoyer le token au serveur
      const response = await axios.post("/payment", {
        amount: totalPrice,
        title: productName,
        token: stripeResponse.token.id,
      });

      if (response.data) {
        setIsPaid(true);
      } else {
        alert("Une erreur est survenue, veuillez réssayer.");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return isPaid ? (
    <p className="payment-done">Merci pour votre achat.</p>
  ) : (
    <form onSubmit={handlePaymentSubmit} className="last-step-payment">
      <CardElement />
      <button className="payment-btn" type="submit" disabled={!stripe}>
        Payer maintenant
      </button>
      <p className="legal">
        <FontAwesomeIcon icon="fa-shield-alt" />
        Ce paiement est crypté et sécurisé
      </p>
    </form>
  );
};

export default CheckoutForm;
