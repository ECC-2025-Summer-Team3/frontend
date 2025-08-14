import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { CalendarWrapper } from "../styles/CalendarStyle.jsx";

const Calendar = () => {
	const events = [
		{ title: "시험접수", start: "2025-08-02", end: "2025-08-05" },
	];

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
