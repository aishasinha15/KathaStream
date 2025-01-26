import axios from "axios";
import { API_END_POINT } from "./constant";

const api = axios.create({
  baseURL: API_END_POINT,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
});

export default api;
