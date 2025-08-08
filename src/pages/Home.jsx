import React from "react";
import Calendar from "../components/Calendar.jsx";
import { GlobalCalendarStyle } from "../styles/CalendarStyle.jsx";

function Home() {
	return (
		<div>
			<GlobalCalendarStyle />
			<Calendar />
		</div>
	);
}

export default Home;
