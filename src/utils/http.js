import axios from "axios";

const http = axios.create({
  baseURL: "/api",         
  headers: { "Content-Type": "application/json" },
});

http.defaults.withCredentials = true;

const token = localStorage.getItem("token") ?? false;

http.defaults.headers.common["Authorization"] = token
  ? `Bearer ${token}`
  : null;

export default http;