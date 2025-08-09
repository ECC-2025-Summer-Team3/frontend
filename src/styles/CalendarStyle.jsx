import styled, { createGlobalStyle } from "styled-components";

export const GlobalCalendarStyle = createGlobalStyle`
	:root {
		--fc-border-color: #fff;

		--fc-button-text-color: #000;
		--fc-button-bg-color: #fff;
		--fc-button-border-color: #000;
		--fc-button-hover-bg-color: #818181;

		--fc-event-bg-color: #ffbf00;
		--fc-event-text-color: #000;
		--fc-event-border-color: none;
	}
`;

export const CalendarWrapper = styled.div`
	.fc-toolbar-title {
		color: #757575;
		font-weight: bold;
		font-size: 25px !important;
	}

	.fc-button {
		width: 30px;
		height: 30px;
		border-radius: 50% !important;
		border: 3px solid !important;
		padding: 0 !important;
		font-size: 15px !important;
		display: flex !important;
		align-items: center;
		justify-content: center;
	}

	.fc-daygrid-day-top {
		margin-bottom: 20px;
	}

	.fc-daygrid-day-number {
		font-size: 10px;
		position: absolute;
		right: 90%;
		margin: 0 0 0 0;
	}

	.fc-day-today {
		background-color: #fff !important;
	}

	.fc-day-today .fc-daygrid-day-number {
		text-decoration: line-through #aeaeae;
		color: #aeaeae;
		display: inline-block;
	}

	.fc .fc-event {
		border-radius: 50px;
		height: 25px;
	}

	.fc-daygrid-event {
		display: flex;
		align-iems: center;
		justify-content: flex-start;
		height: 100%;
	}

	.fc-event-title {
		font-size: 10px;
		line-height: 2;
		padding-left: 15px;
	}

	.fc-col-header {
		display: none;
	}
`;
