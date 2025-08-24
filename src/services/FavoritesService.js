import http from "../utils/http";

// 1. 즐겨찾기 등록
export const addFavorite = async (certificateId) => {
	const res = await http.post(`/favorites/${certificateId}`);
	return res.data;
};

// 2. 즐겨찾기 해제
export const deleteFavorite = async (certificateId) => {
	const res = await http.delete(`/favorites/${certificateId}`);
	return res.data;
};
