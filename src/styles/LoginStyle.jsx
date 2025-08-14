import styled from "styled-components";

export const PageWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
`;

export const Title = styled.h1`
	font-size: 40px;
	margin: 60px 0;
`;

export const LoginMessage = styled.h2`
	display: flex;
	width: 60%;
	jutify-content: flex-start;
	font-size: 18px;
	font-weight: bold;
`;

export const LogPass = styled.p`
	display: flex;
	width: 60%;
	justify-content: flex-start;
	font-size: 12px;
	color: rgb(86, 86, 86);
	font-size: bold;
`;

export const IdInput = styled.input`
	width: 60%;
	height: 35px;
	border-color: rgb(197, 197, 197);
	border-width: 1px;
	border-radius: 5px;
	padding: 0 10px;
	font-size: 12px;
	line-height: 35px;

	&::placeholder {
		color: rgb(111, 111, 111) !important;
		opacity: 1;
		font-size: 12px;
	}
`;

export const Blank = styled.div`
	height: 20px;
`;

export const StyledButton = styled.button`
	width: 60%;
	background-color: ${(props) => (props.disabled ? "lightgray" : "black")};
	height: 50px;
	border-radius: 8px;
	font-size: 12px;
	color: white;
	cursor: ${(props) => (props.disabled ? "default" : "pointer")};
`;
