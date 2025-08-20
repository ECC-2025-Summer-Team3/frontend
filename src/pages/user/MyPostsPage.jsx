import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { fetchUserPosts, deleteUserPost } from "../../services/UserService";
import {
	PageWrapper,
	PrimaryButton,
	Card,
	CardTitle,
	CardContent,
	AlertBar,
	CloseBtn,
	Header,
} from "../../styles/CommunityStyle";

const MyPostsPage = () => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [toast, setToast] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		const loadPosts = async () => {
			try {
				const data = await fetchUserPosts();
				setPosts(data);
			} catch {
				alert("내가 작성한 글을 불러오지 못했습니다.");
			} finally {
				setLoading(false);
			}
		};
		loadPosts();
	}, []);

	const handleDelete = async (item) => {
		if (!window.confirm("정말 삭제하시겠어요?")) return;
		try {
			await deleteUserPost(item.type, item.id);
			setPosts((prev) => prev.filter((p) => p.id !== item.id));
			setToast("삭제가 완료되었습니다");
			setTimeout(() => setToast(""), 3000);
		} catch {
			alert("삭제에 실패했습니다.");
		}
	};

	if (loading) return <PageWrapper>로딩 중...</PageWrapper>;

	return (
		<PageWrapper>
			<Header>내가 작성한 글</Header>

			{toast && (
				<AlertBar role="alert">
					* {toast} *<CloseBtn onClick={() => setToast("")}>×</CloseBtn>
				</AlertBar>
			)}

			{posts.length === 0 ? (
				<Empty>작성한 글이 없습니다.</Empty>
			) : (
				<List>
					{posts.map((p) => (
						<Item key={p.id}>
							<PostTitle>{p.title ?? String(p)}</PostTitle>
							{"content" in p && <CardContent>{p.content}</CardContent>}
							<ButtonRow>
								<PrimaryButton
									$small
									onClick={() => navigate(`/user/my-posts/${p.type}/${p.id}`)}
								>
									수정
								</PrimaryButton>
								<PrimaryButton $small onClick={() => handleDelete(p)}>
									삭제
								</PrimaryButton>
							</ButtonRow>
						</Item>
					))}
				</List>
			)}
		</PageWrapper>
	);
};

export default MyPostsPage;

const List = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

const Item = styled(Card)`
	height: auto;
`;

const PostTitle = styled(CardTitle)`
	white-space: normal !important;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
	word-break: break-word;
`;

const ButtonRow = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 0.5rem;
	margin-top: 0.75rem;
`;

const Empty = styled.p`
	text-align: center;
	color: #6b7280;
`;
