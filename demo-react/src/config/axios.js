import axios from "axios";
const api = axios.create({
  // baseURL: "http://localhost:8080/api/",
  baseURL: "http://167.99.74.201:8080/api/",
});

export default api;
