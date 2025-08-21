import http from "../utils/http";

// 1. 카테고리별 자격증 목록 조회
export const fetchCertificatesByCategory = async (categoryId) => {
	if (!categoryId) throw new Error("categoryId가 필요합니다.");
	const res = await http.get(`/api/categories/${categoryId}/certificates`);
	return res.data;
};

// 2. 자격증 일정 정보 조회
export const fetchCertificatesSchedule = async (categoryId) => {
	if (!categoryId) throw new Error("categoryId가 필요합니다.");
	const res = await http.get(`/api/categories/${categoryId}/schedules`);
	return res.data;
};

// 3. 캘린더에 표시할 자격증 시험 일정 가져오기
export const fetchFavoritesSchedules = async (startDate, endDate) => {
	if (!startDate || !endDate) {
		throw new Error("startDate와 endDate가 필요합니다.");
	}
	const res = await http.get("/schedules/favorites", {
		params: {
			startDate,
			endDate,
		},
	});
	return res.data;
};
