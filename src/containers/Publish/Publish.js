// Lib
import React, { useState } from "react";
import axios from "../../config/api";
import { Navigate, useNavigate } from "react-router-dom";

//CSS
import "./Publish.css";

const Publish = ({ token, setLoginIsOpen }) => {
  // STATES
  const [file, setFile] = useState({});
  const [imageDisplayed, setImageDisplayed] = useState("");
  const [title, setProductTitle] = useState("");
  const [description, setProductDescription] = useState("");
  const [brand, setProductBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setProductCondition] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");

  const navigate = useNavigate();

  const handlePublishSubmit = async (event) => {
    try {
      event.preventDefault();

      const publishFormData = new FormData();
      publishFormData.append("picture", file);
      publishFormData.append("title", title);
      publishFormData.append("description", description);
      publishFormData.append("price", price);
      publishFormData.append("size", size);
      publishFormData.append("color", color);
      publishFormData.append("condition", condition);
      publishFormData.append("city", city);
      publishFormData.append("brand", brand);

      const response = await axios.post("/offer/publish", publishFormData, {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data._id) {
        navigate(`/offer/${response.data._id}`);
      } else {
        alert("Une erreur est survenue");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return token ? (
    <div className="publish">
      <div className="container">
        <h2 className="title">Vends ton article</h2>
        <form onSubmit={handlePublishSubmit}>
          <section className="box-file">
            {imageDisplayed ? (
              <div className="box-file-wrapper">
                <img src={imageDisplayed} alt="visuel produit pré-chargé" />
                <div
                  className="remove-img-box"
                  onClick={() => {
                    setImageDisplayed("");
                  }}
                >
                  X
                </div>
              </div>
            ) : (
              <div className="box-file-wrapper">
                <div className="box-file-btn">
                  <label htmlFor="file">
                    <span className="label-file-icon">+</span>
                    <span>Ajoute une photo</span>
                  </label>
                  <input
                    id="file"
                    type="file"
                    className="input-file"
                    onChange={(event) => {
                      setFile(event.target.files[0]);
                      setImageDisplayed(
                        URL.createObjectURL(event.target.files[0])
                      );
                    }}
                  />
                </div>
              </div>
            )}
          </section>
          <section className="box-text-content">
            <div className="box-text">
              <label htmlFor="product_name">Texte</label>
              <input
                id="product_name"
                type="text"
                onChange={(event) => {
                  setProductTitle(event.target.value);
                }}
                placeholder="ex: Chemise Sézane verte"
              />
            </div>
            <div className="box-text">
              <label htmlFor="product_description">Décris ton article</label>
              <textarea
                id="product_description"
                type="text"
                onChange={(event) => {
                  setProductDescription(event.target.value);
                }}
                placeholder="ex: porté quelquefois, taille correctement"
              ></textarea>
            </div>
          </section>
          <section className="box-text-content">
            <div className="box-text">
              <label htmlFor="product_brand">Marque</label>
              <input
                id="product_brand"
                type="text"
                onChange={(event) => {
                  setProductBrand(event.target.value);
                }}
                placeholder="ex: Zara"
              />
            </div>
            <div className="box-text">
              <label htmlFor="product_size">Taille</label>
              <input
                id="product_size"
                type="text"
                onChange={(event) => {
                  setSize(event.target.value);
                }}
                placeholder="ex: L / 40 / 12"
              />
            </div>
            <div className="box-text">
              <label htmlFor="product_color">Couleur</label>
              <input
                id="product_color"
                type="text"
                onChange={(event) => {
                  setColor(event.target.value);
                }}
                placeholder="ex: Fushia"
              />
            </div>
            <div className="box-text">
              <label htmlFor="product_state">Etat</label>
              <input
                id="product_state"
                type="text"
                onChange={(event) => {
                  setProductCondition(event.target.value);
                }}
                placeholder="ex: Neuf avec étiquette"
              />
            </div>
            <div className="box-text">
              <label htmlFor="product_origin">Lieu</label>
              <input
                id="product_origin"
                type="text"
                onChange={(event) => {
                  setCity(event.target.value);
                }}
                placeholder="ex: Paris"
              />
            </div>
          </section>
          <section className="box-text-content">
            <div className="box-text">
              <label htmlFor="product_price">Prix</label>
              <input
                id="product_price"
                type="text"
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
                placeholder="0.00 €"
              />
            </div>
          </section>
          <section className="box-btn">
            <button type="submit" className="form-validation">
              Ajouter
            </button>
          </section>
        </form>
      </div>
    </div>
  ) : (
    // rediriger vers la pop up de login
    <Navigate to="/" />
  );
};

export default Publish;
