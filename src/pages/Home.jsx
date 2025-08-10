import React from "react";
import Calendar from "../components/Calendar.jsx";
import { GlobalCalendarStyle } from "../styles/CalendarStyle.jsx";
import {
	Search,
	PageWrapper,
	SearchWrapper,
	CalendarWrapper,
} from "../styles/HomeStyle.jsx";

function Home() {
	return (
		<PageWrapper>
			<SearchWrapper>
				<Search />
			</SearchWrapper>
			<CalendarWrapper>
				<GlobalCalendarStyle />
				<Calendar />
			</CalendarWrapper>
		</PageWrapper>
	);
}

export default Home;
