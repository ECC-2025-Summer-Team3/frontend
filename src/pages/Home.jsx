import React from "react";
import { useState } from "react";
import Calendar from "../components/Calendar.jsx";
import { GlobalCalendarStyle } from "../styles/CalendarStyle.jsx";
import {
	Search,
	PageWrapper,
	SearchWrapper,
	CalendarWrapper,
} from "../styles/HomeStyle.jsx";

function Home() {
	const [value, setValue] = useState("");

	return (
		<PageWrapper>
			<SearchWrapper>
				<Search value={value} onChange={(e) => setValue(e.target.value)} />
			</SearchWrapper>
			<CalendarWrapper>
				<GlobalCalendarStyle />
				<Calendar />
			</CalendarWrapper>
		</PageWrapper>
	);
}

export default Home;
