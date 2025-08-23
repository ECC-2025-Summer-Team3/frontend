import axios from "axios";

const http = axios.create({
	//#Mixed Content (https에서 http 요청)에러가 떠서 실제 서버 baseURL은 netlify.toml파일에 설정했습니다.
	baseURL: "http://localhost:8080/api",
	headers: { "Content-Type": "application/json" },
	withCredentials: true,
});

const PUBLIC = ["/api/auth/signup", "/api/auth/login", "/api/auth/check-nickname"];

http.interceptors.request.use((c) => {
  const full = `${(c.baseURL||'').replace(/\/$/,'')}/${(c.url||'').replace(/^\//,'')}`.split("?")[0];
  const isPublic = PUBLIC.some(p => full === p || full.startsWith(p + "/"));
  const h = c.headers || {};
  const t = localStorage.getItem("token");
  if (!isPublic && t) h.Authorization = `Bearer ${t}`; else delete h.Authorization;
  c.headers = h;
  return c;
});

export default http;