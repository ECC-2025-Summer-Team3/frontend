import http from "../utils/http";

/* SharePostService */

// 1-1. 공유마당 글 전체 목록 조회 - 첫번째 카테고리
export const fetchShareDefault = async () => {
	const res = await http.get("/share/default");
	return res.data;
};

// 1-2. 공유마당 카테고리별 게시물 목록 조회
export const fetchShareByCategory = async (categoryId) => {
  const res = await http.get(`/share/category/${categoryId}`);
  return res.data;
};

// 1.3 특정 공유마당 글 조회
export const fetchSharePostById = async (postId) => {
  const res = await http.get(`/share/posts/${postId}`);
  return res.data;
};

// 2. 공유마당 게시물 등록
export const createSharePost = async (postData) => {
  const res = await http.post("/share", postData);
  return res.data;
};

// 3. 공유마당 글 수정
export const updateSharePost = async (postId, updatedData) => {
  const res = await http.patch(`/share/posts/${postId}`, updatedData);
  return res.data;
};

// 4. 공유마당 글 삭제
export const deleteSharePost = async (postId) => {
  const res = await http.delete(`/share/posts/${postId}`);
  return res.status;
};

/* ShareCommentService */

// 1. 댓글 목록 조회
export const fetchShareComments = async (postId) => {
  const res = await http.get(`/share/posts/${postId}/comments`);
  return res.data;
}

// 2. 댓글 등록
export const createShareComment = async (postId, commentData) => {
  const res = await http.post(`/share/posts/${postId}/comments`,  commentData );
  return res.data;
}

// 3. 댓글 수정
export const updateShareComment = async (postId, commentId, updatedComment) => {
  const res = await http.patch(`/share/posts/${postId}/comments/${commentId}`, updatedComment);
  return res.data;
}

// 4. 댓글 삭제
export const deleteShareComment = async (postId, commentId) => {
  const res = await http.delete(`/posts/${postId}/comments/${commentId}`);
  return res.data;
}