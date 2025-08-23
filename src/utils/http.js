import axios from "axios";

const http = axios.create({
	//#Mixed Content (https에서 http 요청)에러가 떠서 실제 서버 baseURL은 netlify.toml파일에 설정했습니다.
	baseURL: "/api",
	headers: { "Content-Type": "application/json" },
	withCredentials: false,
});

// 토큰 저장/해제
export const setAuthToken = (token) => {
	if (token) {
		http.defaults.headers.common.Authorization = `Bearer ${token}`;
	} else {
		delete http.defaults.headers.common.Authorization;
	}
};

// 인터셉터
http.interceptors.request.use((config) => {
	const url = (config.url || "").split("?")[0]; // 쿼리 제거
	const isAuthEndpoint = /^\/?auth(\/|$)/.test(url); // /auth/* 인가?

	// 1. /auth/* 에는 Authorization 보내지 않음
	if (isAuthEndpoint) {
		if (config.headers) delete config.headers.Authorization;
		return config;
	}

	// 2. 그 외 요청엔 토큰 자동 첨부
	const token = localStorage.getItem("token");
	if (token) {
		config.headers = config.headers || {};
		config.headers.Authorization = `Bearer ${token}`;
	} else if (config.headers) {
		delete config.headers.Authorization;
	}

	return config;
});

export default http;