import React from "react";
import styled from "styled-components";
import { PageWrapper } from "../../styles/CommunityStyle";
import { Header } from "../../styles/CommunityStyle";
import { StarFilled } from "@ant-design/icons";

function MyFavoriteEditPage() {
	return (
		<PageWrapper>
			<Header>즐겨찾기 수정</Header>
			<ContentBox>
				<FormWrapper>
					<FavoriteList>
						<FavoriteName>즐겨찾기</FavoriteName>
						<EmptyStar />
					</FavoriteList>
				</FormWrapper>
			</ContentBox>
		</PageWrapper>
	);
}

export default MyFavoriteEditPage;

const ContentBox = styled.div`
	width: 100%;
	max-width: 768px;
`;
const FormWrapper = styled.div`
	background: #f3f4f6;
	border-radius: 16px;
	padding: 2rem;
	height: 100vh;
`;
const FavoriteList = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

const FavoriteName = styled.p`
	text-align: left;
	font-weight: 500;
	font-size: 20px;
	justify-content: center;
	line-height: 1;
	margin: 0;
`;

export const EmptyStar = styled(StarFilled)`
	font-size: 25px;
	color: rgb(110, 110, 110);

	cursor: pointer;
	justify-content: center;
	lign-height: 1;
`;

export const FilledStar = styled(StarFilled)`
	font-size: 25px;
	color: rgb(255, 196, 0);

	cursor: pointer;
	justify-content: center;
	lign-height: 1;
`;
