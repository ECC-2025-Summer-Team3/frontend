import http from "../utils/http";

/* 마이페이지 */
export const fetchMyPage = async () => {
	const res = await http.get("/user/my-page");
	return res.data;
};

// 비밀번호 재설정
export const resetPassword = async (newPassword) => {
	const res = await http.post("/user/reset-password", {
		token: localStorage.getItem("token"),
		newPassword: newPassword,
	});
	return res.data;
};

// 프로필 이미지 수정
export const updateProfileImg = async (img) => {
	const res = await http.patch("/user/profile-image", img, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
	return res;
};

/* UserCommentService */

// 1-1 내가 쓴 댓글 목록 조회
export const fetchUserComments = async () => {
	const res = await http.get("/user/my-comments");
	return res.data;
};

// 1-2 내가 쓴 특정 댓글 조회
export const fetchUserCommentById = async (type, commentId) => {
	if (!type || !commentId) {
		throw new Error("type과 commentId가 필요합니다.");
	}
	const res = await http.get(`/user/my-comments/${type}/${commentId}`);
	return res.data;
};

// 2. 내가 쓴 댓글 수정
export const updateUserComment = async (type, commentId, content) => {
	if (!type || commentId == null)
		throw new Error("type과 commentId가 필요합니다.");
	const res = await http.patch(
		`/user/my-comments/${type}/${commentId}`,
		content,
	);
	return res.data;
};

// 3. 내가 쓴 댓글 삭제
export const deleteUserComment = async (type, commentId) => {
	if (!type || commentId == null) {
		throw new Error("type과 commentId가 필요합니다.");
	}
	const res = await http.delete(`/user/my-comments/${type}/${commentId}`);
	return res.data;
};

/* UserPostService */

// 1-1. 내가 쓴 글 조회
export const fetchUserPosts = async () => {
	const res = await http.get("/user/my-posts");
	return res.data;
};

// 1-2. 내가 쓴 특정 게시글 조회
export const fetchUserPostById = async (type, postId) => {
	if (!type || !postId) {
		throw new Error("type과 postId가 필요합니다.");
	}
	const res = await http.get(`/user/my-posts/${type}/${postId}`);
	return res.data;
};

// 2. 내가 쓴 글 수정
export const updateUserPost = async (type, postId, payload = {}) => {
	//API 다시 확인 (@RequsetBody 2개?)
	if (!type || postId == null) throw new Error("type과 postId가 필요합니다.");
	const body = {
		title: payload.title ?? null,
		content: payload.content ?? null,
	};
	const res = await http.patch(`/user/my-posts/${type}/${postId}`, body);
	return res.data;
};

// 3. 내가 쓴 글 삭제
export const deleteUserPost = async (type, postId) => {
	if (!type || postId == null) {
		throw new Error("type과 postId가 필요합니다.");
	}
	const res = await http.delete(`/user/my-posts/${type}/${postId}`);
	return res.data;
};
