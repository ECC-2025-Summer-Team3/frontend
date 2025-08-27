import publicApi from "../utils/auth";
import http from "../utils/http";

// 1. 로그인
export const loginUser = async ({ email, password }) => {
	const res = await publicApi.post("/auth/login", {
		//publicApi
		email,
		password,
	});
	return res.data;
};

//2. 회원가입
export const registerUser = async (nickname, email, password) => {
	const res = await publicApi.post("/auth/signup", {
		////publicApi
		nickname,
		email,
		password,
	});
	return res.data;
};

// 3.로그아웃
export const logoutUser = async () => {
	console.log("Auth header:", http.defaults.headers.common.Authorization);
	const res = await http.post("/auth/logout");
	return res.data;
};

// 4.닉네임 중복 확인
export const checkNickname = async (nickname) => {
	const res = await http.get("/auth/check-nickname", {
		params: {
			nickname,
		},
	});
	return res.data;
};

// 5.이메일 중복 확인
export const checkEmail = async (email) => {
	const res = await http.get("/auth/check-email", {
		params: {
			email,
		},
	});
	return res.data;
};
