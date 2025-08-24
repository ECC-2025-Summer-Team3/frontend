import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { CalendarWrapper } from "../styles/CalendarStyle.jsx";
import { fetchFavoritesSchedules } from "../services/CertificateService.js";
import { useState, useEffect } from "react";

const Calendar = () => {
	const [events, setEvents] = useState([]);
	const today = new Date();
	const [start, setStart] = useState(
		new Date(today.getFullYear(), today.getMonth(), 1),
	);
	const [end, setEnd] = useState(
		new Date(today.getFullYear(), today.getMonth() + 1, 0),
	);

	useEffect(() => {
		const fetchSchedules = async () => {
			try {
				const data = await fetchFavoritesSchedules(
					formatDate(start),
					formatDate(end),
				);
				const event = data.map((schedule) => {
					const end = new Date(schedule.endDate);
					end.setDate(end.getDate() + 1);

					return {
						title: schedule.certificateName + " " + schedule.scheduleTypeName,
						start: schedule.stratDate,
						end: formatDate(end),
					};
				});
				setEvents(event);
				console.log(formatDate(start), formatDate(end));
				console.log(data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchSchedules();
	}, [start, end]);

	const formatDate = (date) => {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	};

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
				datesSet={function (arg) {
					setStart(arg.view.currentStart);
					setEnd(arg.view.currentEnd);
				}}
			/>
		</CalendarWrapper>
	);
};

export default Calendar;
