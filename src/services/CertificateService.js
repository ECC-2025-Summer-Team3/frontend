import http from "../utils/http";

// 1. 카테고리별 자격증 목록 조회
export const fetchCertificatesByCategory = async (categoryId) => {
	if (!categoryId) throw new Error("categoryId가 필요합니다.");
	const res = await http.get(`/api/categories/${categoryId}/certificates`);
	return res.data;
};

// 2. 자격증 상세 정보 조회
