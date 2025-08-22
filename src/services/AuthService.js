import http from "../utils/http";

// 1. 로그인
export const loginUser = async ({ email, password }) => {
	const res = await http.post("/auth/login", {
		email,
		password,
	});
	return res.data;
};

//2. 회원가입
export const registerUser = async ({ nickname, email, password }) => {
	const res = await http.post("/auth/signup", {
		nickname,
		email,
		password,
	});
	return res.data;
};
