import React from "react";
import styled from "styled-components";
import { PageWrapper } from "../../styles/CommunityStyle";
import { Header } from "../../styles/CommunityStyle";
import { StarFilled } from "@ant-design/icons";
import {
	fetchFavorite,
	addFavorite,
	deleteFavorite,
} from "../../services/FavoritesService";
import { useState, useEffect } from "react";

function MyFavoriteEditPage() {
	const [favorites, setFavorites] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const data = await fetchFavorite();
				setFavorites(data);
				console.log(data);
			} catch (e) {
				console.error(e);
			}
		})();
	}, []);

	return (
		<PageWrapper>
			<Header>즐겨찾기 수정</Header>
			<ContentBox>
				<FormWrapper>
					{Array.isArray(favorites) &&
						favorites.map((f) => (
							<FavoriteList key={f.certificateId}>
								<FavoriteName>{f.certificateName}</FavoriteName>
								<FilledStar />
							</FavoriteList>
						))}
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
	margin-bottom: 15px;
`;

const FavoriteName = styled.p`
	text-align: left;
	font-weight: 500;
	font-size: 20px;
	justify-content: center;
	line-height: 1;
	margin: 0;
`;

const EmptyStar = styled(StarFilled)`
	font-size: 25px;
	color: rgb(110, 110, 110);

	cursor: pointer;
	justify-content: center;
	lign-height: 1;
`;

const FilledStar = styled(StarFilled)`
	font-size: 25px;
	color: rgb(255, 196, 0);

	cursor: pointer;
	justify-content: center;
	lign-height: 1;
`;
