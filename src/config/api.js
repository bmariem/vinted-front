import axios from "axios";

const instance = axios.create({
  baseURL: "https://lereacteur-vinted-api.herokuapp.com/", // API Reacteur
});

export default instance;
