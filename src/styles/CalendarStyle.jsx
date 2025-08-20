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
	width: 100%;
	min-width: 500px;
	max-width: none;
	margin: 0 auto;

	.fc-header-toolbar {
		display: flex;
		justify-content: space-between;
	}

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

	.fc-daygrid {
		width: 100%;
	}

	.fc-daygrid-day-top {
		margin-bottom: 0px;
	}

	.fc .fc-daygrid-day-frame {
		display: flex;
		flex-direction: column;
		align-items: Center;
		justify-content: center;
		position: relative;
	}

	.fc-daygrid-day-number {
		font-size: 10px;
		margin-bottom: 2px;
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
		height: 25px;
		width: 100%;
		border-radius: 0 !important;
	}

	.fc-event.fc-event-start {
		border-top-left-radius: 30px !important;
		border-bottom-left-radius: 30px !important;
	}

	.fc-event.fc-event-end {
		border-top-right-radius: 30px !important;
		border-bottom-right-radius: 30px !important;
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

	.fc-event:not(.fc-event-start) .fc-event-title {
		display: none;
	}

	.fc-col-header {
		display: none;
	}
`;
