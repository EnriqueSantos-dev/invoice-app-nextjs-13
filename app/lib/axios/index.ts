import axios from "axios";

let url =
  process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3000";

const api = axios.create({
  baseURL: url,
});

export default api;
