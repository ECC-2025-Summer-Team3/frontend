export const handleApiResponse = (res) => {
  const result = res.data;

  if (result.status !== "success") {
    throw new Error(result.message || "API 요청 실패");
  }

  return result.data;
};