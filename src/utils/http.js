import axios from "axios";

const http = axios.create({
	//#Mixed Content (https에서 http 요청)에러가 떠서 실제 서버 baseURL은 netlify.toml파일에 설정했습니다.
	baseURL: "http://3.34.223.76:8080/api",
	headers: { "Content-Type": "application/json" },
	withCredentials: true,
});

export const setAuthToken = (token) => {
	if (token) {
		http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	} else {
		delete http.defaults.headers.common["Authorization"];
	}
};
//인터셉터
http.interceptors.request.use((config) => {
	// admin test할때 토큰 여기에 넣음
	const devToken = ""; // admin token 여기에 넣기
	const token = devToken || localStorage.getItem("token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	} else {
		delete config.headers.Authorization;
	}
	return config;
});

export default http;
