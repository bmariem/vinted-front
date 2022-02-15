import axios from "axios";

const instance = axios.create({
  // baseURL: "https://lereacteur-vinted-api.herokuapp.com/", // API Reacteur
  baseURL: "https://api-vinted-project.herokuapp.com/", // mon API
});

export default instance;
