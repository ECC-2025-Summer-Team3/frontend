import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { CalendarWrapper } from "../styles/CalendarStyle.jsx";
import { useState, useEffect } from "react";
import { fetchFavoritesSchedules } from "../services/CertificateService.js";
import { useRef } from "react";

const Calendar = () => {
	const [schedules, setSchedules] = useState([]);
	const [y, setY] = useState(new Date().getFullYear());
	const [m, setM] = useState(new Date().getMonth() + 1);
	const calendarRef = useRef(null);

	useEffect(() => {
		const loadSchedules = async () => {
			try {
				const start = new Date(y, m, 1);
				const end = new Date(y, m + 1, 0);

				const format = (date) =>
					`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
						date.getDate(),
					).padStart(2, "0")}`;

				const data = await fetchFavoritesSchedules(format(start), format(end));
				setSchedules(Array.isArray(data) ? data : []);
			} catch (err) {
				console.error("즐겨찾기 일정 조회 실패:", err.message);
			}
		};
		loadSchedules();
		console.log(y, m);
		console.log(schedules);
	}, [y, m]);

	const events = schedules.map((s) => ({
		title: `${s.certificateName} ${s.scheduleTypeName}`,
		start: s.startDate,
		end: s.endDate
			? new Date(new Date(s.endDate).getTime() + 24 * 60 * 60 * 1000)
					.toISOString()
					.slice(0, 10)
			: s.startDate,
	}));

	return (
		<CalendarWrapper>
			<FullCalendar
				ref={calendarRef}
				plugins={[dayGridPlugin]}
				initialView="dayGridMonth"
				locale={"ko"}
				height={"700px"}
				titleFormat={function (date) {
					const year = date.date.year;
					const month = String(date.date.month + 1).padStart(2, "0");
					return year + " / " + month;
				}}
				headerToolbar={{
					left: "prev",
					center: "title",
					right: "next",
				}}
				dayCellContent={function (arg) {
					return { html: String(arg.date.getDate()) };
				}}
				events={events}
				customButtons={{
					prev: {
						click: () => {
							calendarRef.current.getApi().prev(); // 달 이동
							const start = calendarRef.current.getApi().view.currentStart;
							setY(start.getFullYear());
							if (start.getMonth() === 0) setM(1);
							else setM(start.getMonth() + 1);
						},
					},
					next: {
						click: () => {
							calendarRef.current.getApi().next(); // 달 이동
							const start = calendarRef.current.getApi().view.currentStart;
							setY(start.getFullYear());
							if (start.getMonth() === 0) setM(1);
							else setM(start.getMonth() + 1);
						},
					},
				}}
			/>
		</CalendarWrapper>
	);
};

export default Calendar;
