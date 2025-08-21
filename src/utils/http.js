import axios from "axios";

const http = axios.create({
	//#Mixed Content (https에서 http 요청)에러가 떠서 실제 서버 baseURL은 netlify.toml파일에 설정했습니다.
	baseURL: "/api",
	headers: { "Content-Type": "application/json" },
	// withCredentials: true,
});

export const setAuthToken = (token) => {
	if (token) {
		http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	} else {
		delete http.defaults.headers.common["Authorization"];
	}
};

export default http;
