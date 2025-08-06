import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	fetchStudyPostById,
	fetchComments,
	createComment,
} from "../../services/StudyService";
import CommentItem from "../../components/community/CommentItem";
import {
	PageWrapper,
	PrimaryButton,
	BaseInput,
} from "../../styles/CommunityStyle";
import styled from "styled-components";
import { media } from "../../styles/media";

const StudyDetailPage = () => {
	const { postId } = useParams();
	const [post, setPost] = useState(null);
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const loadData = async () => {
			setIsLoading(true);
			try {
				const resPost = await fetchStudyPostById(postId);
				setPost(resPost);
				const resComments = await fetchComments(postId);
				setComments(resComments);
			} catch (error) {
				alert("해당 글을 불러오지 못했습니다.");
			}
			setIsLoading(false);
		};

		loadData();
	}, [postId]);

	const handleCommentSubmit = async () => {
		if (!newComment.trim()) return;
		try {
			await createComment(postId, { user_id: 1, content: newComment });
			const res = await fetchComments(postId);
			setComments(res);
			setNewComment("");
		} catch (error) {
			alert("댓글 등록에 실패했습니다.");
		}
	};

	const currentUserId = Number(localStorage.getItem("userId")) || 1;

	if (isLoading) {
		return (
			<PageWrapper>
				<PostBox>
					<p>로딩 중...</p>
				</PostBox>
			</PageWrapper>
		);
	}

	return (
		<PageWrapper>
			{/* 글 내용 */}
			<PostBox>
				<TitleRow>
					<PostTitle>{post.title}</PostTitle>
					<Nickname>글쓴이닉네임</Nickname>
				</TitleRow>
				<PostContent>{post.content}</PostContent>
			</PostBox>

			<Divider />

			{/* 댓글 리스트 */}
			<CommentList>
				{comments.map((cmt) => (
					<CommentItem
						key={cmt.commentId}
						nickname={cmt.nickname}
						content={cmt.content}
						avatarUrl={cmt.avatarUrl}
						onEdit={() => alert("수정 기능 준비중")}
						onDelete={() => alert("삭제 기능 준비중")}
						isMyComment={cmt.user_id === currentUserId}
					/>
				))}
			</CommentList>

			{/* 댓글 입력창 */}
			<CommentInputBox>
				<span style={{ marginRight: "0.5rem", fontSize: "1.2rem" }}>💬</span>
				<StyledInput
					placeholder="댓글을 입력하세요."
					value={newComment}
					onChange={(e) => setNewComment(e.target.value)}
				/>
				<PrimaryButton onClick={handleCommentSubmit}>등록</PrimaryButton>
			</CommentInputBox>
		</PageWrapper>
	);
};

export default StudyDetailPage;

const PostBox = styled.div`
	background-color: rgba(254, 245, 245, 0.56);
	border: 3px solid rgba(217, 217, 217, 1);
	border-radius: 15px;
	min-height: 354px;
	padding: 1.25rem 1rem;
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
`;

const TitleRow = styled.div`
	display: flex;
	align-items: baseline;
	gap: 0.5rem;
	flex-wrap: wrap;

	${media.tablet`
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  `}
`;

const PostTitle = styled.h2`
	font-size: 1.5rem;
	font-weight: 800;
	line-height: 1.4;
	margin: 0;

	${media.mobile`
    font-size: 1.25rem;
    text-align: left;
  `}
`;

const Nickname = styled.span`
	font-size: 1rem;
	color: #6b7280;

	${media.tablet`
    align-self: flex-end;
    font-size: 0.875rem;
  `}
`;

const PostContent = styled.div`
	font-size: 0.875rem;
	font-weight: 300;
	line-height: 1;
	color: rgba(0, 0, 0, 1);
	white-space: pre-wrap;
	text-align: left;
	margin-left: 2.5rem;
`;

const Divider = styled.hr`
	margin: 2rem 0 1.25rem;
	border: none;
	border-top: 1px solid #d1d5db;
`;

const CommentList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
`;

const CommentInputBox = styled.div`
	margin-top: 1.5rem;
	display: flex;
	align-items: center;
	background-color: #eeeeee;
	border-radius: 12px;
	padding: 0.5rem 0.75rem;
	gap: 0.5rem;
	flex-wrap: nowrap;
	width: 100%;
	box-sizing: border-box;
`;

const StyledInput = styled(BaseInput)`
	flex: 1;
	min-width: 0;
	background-color: transparent;
	border: none;
	padding: 0;
`;
