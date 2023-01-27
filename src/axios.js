import axios from "axios";
//creating a base url
const instance = axios.create({
  baseURL: "https://shoppee-backend.herokuapp.com/",
});

export default instance;