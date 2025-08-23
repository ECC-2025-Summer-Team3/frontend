import axios from "axios";

const publicApi = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});


publicApi.interceptors.request.use((config) => {
  const h = config.headers || {};
  if (typeof h.delete === "function") {      
    h.delete("Authorization");
  } else {                                
    delete h.Authorization;
  }
  try {
    delete axios.defaults?.headers?.common?.Authorization;
  } catch {
    //
  }
  config.headers = h;
  return config;
});

export default publicApi;