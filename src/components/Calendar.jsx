import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { CalendarWrapper } from "../styles/CalendarStyle.jsx";
import { useState, useEffect } from "react";
import { fetchFavoritesSchedules } from "../services/CertificateService.js";

const Calendar = () => {
	const [schedules, setSchedules] = useState([]);
	const [y, setY] = useState(new Date().getFullYear());
	const [m, setM] = useState(new Date().getMonth());

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
				console.log(data);
			} catch (err) {
				console.error("즐겨찾기 일정 조회 실패:", err.message);
			} finally {
				console.log(schedules);
			}
		};
		loadSchedules();
	}, [y, m]);

	const events = schedules.map((s) => ({
		title: `${s.certificateName} ${s.scheduleTypeName}`,
		start: s.startDate,
		end: s.endDate
			? new Date(new Date(s.endDate).getTime() + 24 * 60 * 60 * 1000)
					.toString()
					.slice(0, 10)
			: s.startDate,
	}));

	return (
		<CalendarWrapper>
			<FullCalendar
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
				datesSet={(arg) => {
					setY(arg.start.getFullYear());
					setM(arg.start.getMonth());
				}}
			/>
		</CalendarWrapper>
	);
};

export default Calendar;
