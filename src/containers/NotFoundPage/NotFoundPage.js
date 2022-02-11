import React from "react";
import { useNavigate } from "react-router-dom";

// Assets
import page404 from "../../assets/images/page404.png";

// CSS
import "./NotFoundPage.css";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="NotFoundPage-container">
      <img src={page404} alt="erreur 404 : page non trouvé" />
      <h2>La page n'existe pas</h2>
      <p>
        Désolé, mais on dirait que cette page n'existe plus. Pourquoi ne pas
        revenir en arrière et essayer autre chose ?
      </p>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Retourner à la page d'accueil
      </button>
    </div>
  );
};

export default NotFoundPage;
