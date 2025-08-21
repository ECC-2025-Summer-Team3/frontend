import http from "../utils/http";

// 1. 로그인인
export const loginUser = async ({ email, password }) => {
	const res = await http.post("/auth/login", {
		email,
		password,
	});
	return res.data;
};
