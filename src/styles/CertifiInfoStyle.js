import styled from "styled-components";
import { StarOutlined, StarFilled } from "@ant-design/icons";

export const PageWrapper = styled.div`
	width: 100%;
	margin-top: 20px;
`;

export const InfoTitle = styled.h1`
	display: inline-block;
	color: black;
	background-color: rgb(230, 230, 230);
	padding: 8px 50px;
	border-radius: 10px;
	font-size: clamp(1rem, 2.5vw, 1.5rem);
	transition: font-size 0.2s ease;
	margin: 0;
`;

export const Blank = styled.div`
	height: 20px;
`;

export const InfoText = styled.h2`
	font-size: clamp(0.8rem, 1.8vw, 1.2rem);
	transition: font-size 0.2s ease;
	padding-bottom: 5px;
	border-bottom: 1px solid black;
	text-align: left;
	font-weight: 600;
`;

export const InfoContent = styled.p`
	font-size: clamp(0.5rem, 1.5vw, 1rem);
	transition: font-size 0.2s ease;
	text-align: left;
	color: black;
`;

export const OfficialLink = styled.a`
	font-size: clamp(0.5rem, 1.5vw, 1rem);
	transition: font-size 0.2s ease;
	display: block;
	width: 100%;
	text-align: left;
	color: blue;
	cursor: pointer;
`;

export const BlankStar = styled(StarOutlined)`
	font-size: clamp(1.2rem, 4vw, 1.8rem);
	color: rgb(255, 196, 0);
	margin-left: 5px;
	cursor: pointer;
`;

export const FilledStar = styled(StarFilled)`
	font-size: clamp(1.2rem, 4vw, 1.8rem);
	color: rgb(255, 196, 0);
	margin-left: 5px;
	cursor: pointer;
`;

export const TitleWrapper = styled.div`
	display: flex;
	align-items: center;
	height: clamp(1.5rem, 4vw, 2rem);
	justify-content: center;
`;
