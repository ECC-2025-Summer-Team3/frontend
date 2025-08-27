import { FaSearch } from "react-icons/fa";
import styled from "styled-components";

export const PageWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center;
`;

export const SearchWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-start;
	position: relative;
	margin: 10px 0 20px 0;
`;

export const CalendarWrapper = styled.div`
	width: 95%;
	align-items: center;
	justify-content: center;
`;

export const SearchBar = styled.div`
	position: relative;
	width: 200px;
`;

export const SearchIcon = styled(FaSearch)`
	position: absolute;
	top: 50%;
	left: 5px;
	right: 10px;
	transform: translateY(-50%);
	color: black;
	font-size: 25px;
`;

export const SearchInput = styled.input`
	&::placeholder {
		color: rgb(111, 111, 111) !important;
		opacity: 1;
	}

	background-color: rgb(225, 225, 225);
	height: 40px;
	border-radius: 10px;
	padding-left: 35px;
	padding-right: 10px;
	font-size: 10px;
	font-weight: bold;
	margin: 0;
	width: 100%;
	border: none;
`;
