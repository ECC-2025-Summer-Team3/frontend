import styled from "styled-components";

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
	padding-bottom: 15px;
	text-align: left;
	color: black;
`;
