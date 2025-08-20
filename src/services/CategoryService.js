import http from "../utils/http";

// 1. 카테고리 전체 조회
export const fetchCategories = async () => {
  const res = await http.get("/categories");
  return res.data;
};

// 2. 특정 카테고리 조회
export const fetchCategoryById = async (categoryId) => {
  if (categoryId == null) throw new Error("categoryId가 필요합니다.");
  const res = await http.get(`/categories/${categoryId}`);
  return res.data;
};
