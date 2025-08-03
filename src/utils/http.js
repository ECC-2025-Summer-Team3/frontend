import axios from "axios";

const http = axios.create({
  baseURL: "", 
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});


http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default http;
