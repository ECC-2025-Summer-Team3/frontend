import axios from "axios";

const http = axios.create({
  //#Mixed Content (https에서 http 요청)에러가 떠서 실제 서버 baseURL은 netlify.toml파일에 설정했습니다.
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

//인터셉터
http.interceptors.request.use((config) => {
  // admin test할때 토큰 여기에 넣음
  const devToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMDFAZXhhbXBsZS5jb20iLCJ1c2VySWQiOjEwLCJuaWNrbmFtZSI6InVzZXIwMSIsImlhdCI6MTc1NTc1MjcyNCwiZXhwIjoxNzU1NzU2MzI0fQ.l8fOzYImEiwHN-_ViGDmnL3eBQfiPzePcJ6hKm_NOyk"; // admin token 여기에 넣기
  const token = devToken || localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

export default http;