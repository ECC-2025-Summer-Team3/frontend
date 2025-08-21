import http from "../utils/http";

/* StudyPostService */

// 1-1. 스터디 게시판 전체 글 조회 by 카테고리에서 기본 화면 (카테고리 번호=1)
export const fetchStudyDefault = async () => {
	const res = await http.get("/study/default");
	return res.data;
};

// 1-2. 스터디 게시판 전체 글 조회 by 카테고리
export const fetchStudyByCategory = async (categoryId) => {
	const res = await http.get(`/study/category/${categoryId}`);
	return res.data;
};

// 1-3. 특정 스터디 게시판 글 조회
export const fetchStudyPostById = async (postId) => {
	const res = await http.get(`/study/${postId}`);
	return res.data;
};

// 2. 스터디 게시판 글 생성
export const createStudyPost = async (postData) => {
	const res = await http.post("/study", postData);
	return res.data;
};

// 3. 스터디 게시판 글 수정
export const updateStudyPost = async (postId, updatedPost) => {
	const res = await http.patch(`/study/${postId}`, updatedPost);
	return res.data;
};

// 4. 스터디 게시판 글 삭제
export const deleteStudyPost = async (postId) => {
	const res = await http.delete(`/study/${postId}`);
	return res.status;
};

/* StudyCommentService */

// 1. 스터디 게시판 글의 댓글 조회
export const fetchStudyComments = async (postId) => {
	if (postId === undefined || postId === null) {
		throw new Error("postId가 필요합니다.");
	}
	const res = await http.get(`/study/${postId}/comments`);
	return res.data;
};

// 2. 스터디 게시판 글의 댓글 생성하기
export const createStudyComment = async (postId, commentData) => {
	if (postId === undefined || postId === null) {
		throw new Error("postId가 필요합니다.");
	}
	const res = await http.post(`/study/${postId}/comments`, commentData);
	return res.data;
};

// 3. 스터디 게시판 댓글 수정
export const updateStudyComment = async (commentId, updatedComment) => {
	if (commentId === undefined || commentId === null) {
		throw new Error("commentId가 필요합니다.");
	}
	const body =
		typeof updatedComment === "string"
			? { content: updatedComment.trim() }
			: { ...updatedComment };
	const res = await http.patch(`/comments/${commentId}`, body);
	return res.data;
};

// 4. 스터디 게시판 댓글 삭제
export const deleteStudyComment = async (commentId) => {
	if (commentId === undefined || commentId === null) {
		throw new Error("commentId가 필요합니다.");
	}
	const res = await http.delete(`/comments/${commentId}`);
	if (res.status === 204) {
		return { status: "success", message: "댓글 삭제 성공!" };
	}
	return res.status;
};
