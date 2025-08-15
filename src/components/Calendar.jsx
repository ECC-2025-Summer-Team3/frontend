import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { CalendarWrapper } from "../styles/CalendarStyle.jsx";
import { useEffect, useState } from "react";

const Calendar = () => {
	const [events, setEvents] = useState([]);

	useEffect(() => {
		fetch("/api/calendar")
			.then((res) => res.json())
			.then((data) => {
				console.log("Calendar fetch data:", data);
				const arr = Array.isArray(data) ? data : [data];
				setEvents(arr);
			})
			.catch(console.error);
	}, []);

	return (
		<CalendarWrapper>
			<FullCalendar
				plugins={[dayGridPlugin]}
				initialView="dayGridMonth"
				locale={"ko"}
				height={"700px"}
				titleFormat={function (date) {
					let year = date.date.year;
					let month = String(date.date.month + 1).padStart(2, "0");
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
			/>
		</CalendarWrapper>
	);
};

export default Calendar;
