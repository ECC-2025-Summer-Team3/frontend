import { http, HttpResponse } from "msw";

export const handlers = [
	http.get("/api/calendar", () => {
		return HttpResponse.json(
			{
				title: "시험접수",
				start: "2025-08-01",
				end: "2025-08-12",
			},
			{
				title: "수험표출력",
				start: "2025-08-14",
				end: "2025-08-21",
			},
		);
	}),
	http.get("/home", () => {
		return HttpResponse.json({ message: "홈 데이터" });
	}),
];
