import http from "../utils/http";
import { handleApiResponse } from "../utils/api";

//전체 글 조회
export const fetchStudyPosts = async () => {
  const res = await http.get("/api/study");
  return handleApiResponse(res);
};

//특정 글 조회
export const fetchStudyPostById = async (postId) => {
  const res = await http.get(`/api/study/${postId}`);
  return handleApiResponse(res);
};

//글 등록
export const createStudyPost = async (postData) => {
  const res = await http.post("/api/study", postData);
  return handleApiResponse(res);
};

//글 수정
export const updateStudyPost = async (postId, updatedData) => {
  const res = await http.patch(`/api/study/${postId}`, updatedData);
  return handleApiResponse(res);
};

// 글 삭제
export const deleteStudyPost = async (postId) => {
  const res = await http.delete(`/api/study/${postId}`);
  return handleApiResponse(res);
};

//댓글 조회
export const fetchComments = async (postId) => {
  const res = await http.get(`/api/study/${postId}/comments`);
  return handleApiResponse(res);
};

//댓글 등록
export const createComment = async (postId, commentData) => {
  const res = await http.post(`/api/study/${postId}/comments`, commentData);
  return handleApiResponse(res);
};

//댓글 수정
export const updateComment = async (postId, commentId, content) => {
  const res = await http.patch(`/api/study/${postId}/comments/${commentId}`, {
    content,
  });
  return handleApiResponse(res);
};

//댓글 삭제
export const deleteComment = async (postId, commentId) => {
  const res = await http.delete(`/api/study/${postId}/comments/${commentId}`);
  return handleApiResponse(res);
};
