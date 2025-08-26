import styled from "styled-components";
import { Checkbox, Divider, Button } from "antd";

export const PageWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 40%;
	margin: 0 auto;
	justify-content: center;
	height: 100vh;
	min-width: ${(props) => props.minWidth || "400px"};
`;

export const Title = styled.h1`
	font-size: 40px;
	width: 100%;
	margin: 60px 0;
`;

export const LoginMessage = styled.h2`
	display: flex;
	width: 100%;
	jutify-content: flex-start;
	font-size: 18px;
	font-weight: bold;
`;

export const InstText = styled.p`
	display: flex;
	width: 100%;
	justify-content: flex-start;
	font-size: 12px;
	color: black;
	font-size: bold;
	margin: 0;
`;

export const InputText = styled.input`
	width: 100%;
	height: 35px;
	border-color: rgb(197, 197, 197);
	border-width: 1px;
	border-radius: 5px;
	padding: 0 10px;
	font-size: 12px;
	line-height: 35px;
	margin: 5px 0;
	&::placeholder {
		color: rgb(111, 111, 111) !important;
		opacity: 1;
		font-size: 12px;
	}
`;

export const OverlapButton = styled(Button)`
	position: absoulte;
	height: 35px;
	margin: 5px 0 5px 8px;
	border-radius: 5px;
	color: white;
	font-size: 12px;
	background-color: black;
`;

export const JoinButton = styled(OverlapButton)`
	height: 40px;
	font-size: 15px;
	width: 100px;
`;

export const Blank = styled.div`
	height: 20px;
`;

export const LoginButton = styled(Button)`
	width: 100%;
	background-color: ${(props) => (props.disabled ? "lightgray" : "black")};
	height: 50px;
	border-radius: 8px;
	font-size: 12px;
	color: white;
	cursor: ${(props) => (props.disabled ? "default" : "pointer")};
`;

export const WidthWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
`;

export const RightLinks = styled.div`
	display: flex;
	align-items: center;
	gap: 16px;
`;

export const LoginCheck = styled(Checkbox)`
	display: flex;
	align-items: center;
	font-size: 10px;
	font-weight: bold;
	color: rgb(101, 101, 101);
	margin-right: 50px;
`;

export const P1 = styled.p`
	font-size: 10px;
	color: rgb(101, 101, 101);
	height: 15px;
	margin: 0;
`;

export const Divide = styled(Divider)`
	border-color: black;
	width: 100%;
	margin: 15px 0 8px 0;
`;

export const SignButton = styled(Button)`
	background-color: rgb(108, 108, 108);
	height: 30px;
	border-radius: 5px;
	font-size: 12px;
	color: white;
	cursor: pointer;
`;

export const ProfileWrapper = styled.div`
	display: flex;
	align-items: end;
`;

export const UploadButton = styled.div`
	margin-top: 10px;
	cursor: pointer;
`;

export const NameText = styled.p`
	font-size: 30px;
	margin-top: 20px;
	font-weight: 600;
`;

export const MyPageTitle = styled.p`
	font-size: 20px;
	border-bottom: 1px solid black;
	padding: 10px 2px;
	font-weight: 600;
	width: 100%;
	text-align: left;
	margin-bottom: 10px;
`;

export const MyPageText = styled.p`
	font-size: 15px;
	font-weight: 600;
	padding: 0 2px;
	width: 100%;
	text-align: left;
	margin: 10px 0;
	cursor: pointer;
`;
