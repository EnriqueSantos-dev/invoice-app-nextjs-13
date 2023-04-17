import axios from "axios";

const BASE_URL =
	process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3000/api";

const api = axios.create({
	baseURL: BASE_URL,
});

export default api;
