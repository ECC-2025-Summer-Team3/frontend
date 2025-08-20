import axios from "axios";

const http = axios.create({
  baseURL: "http://3.34.223.76:8080",         
  headers: { "Content-Type": "application/json" },
});

http.defaults.withCredentials = true;

const token = localStorage.getItem("token") ?? false;

http.defaults.headers.common["Authorization"] = token
  ? `Bearer ${token}`
  : null;

export default http;