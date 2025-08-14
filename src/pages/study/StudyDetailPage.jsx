import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	fetchStudyPostById,
	fetchComments,
	createComment,
	updateComment,
	deleteComment,
} from "../../services/StudyService";
import CommentItem from "../../components/community/CommentItem";
import {
	CommunityBaseStyle,
	PageWrapper,
	PrimaryButton,
	BaseInput,
} from "../../styles/CommunityStyle";
import styled from "styled-components";

const StudyDetailPage = () => {
	const { postId } = useParams();
	const [post, setPost] = useState(null);
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	const [editingId, setEditingId] = useState(null);
	const [draft, setDraft] = useState("");
	const [saving, setSaving] = useState(false);

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

	const startEdit = (c) => {
		if (c.user_id !== currentUserId) return;
		setEditingId(c.commentId);
		setDraft(c.content);
	};

	const cancelEdit = () => {
		setEditingId(null);
		setDraft("");
	};

	const saveEdit = async (commentId) => {
		const content = draft.trim();
		if (!content) return;
		try {
			setSaving(true);
			await updateComment(postId, commentId, content);
			setComments((prev) =>
				prev.map((c) => (c.commentId === commentId ? { ...c, content } : c)),
			);
			cancelEdit();
		} catch (e) {
			alert("댓글 수정에 실패했습니다.");
		} finally {
			setSaving(false);
		}
	};

	const removeComment = async (c) => {
		if (c.user_id !== currentUserId) return;
		if (!window.confirm("정말 삭제하시겠어요?")) return;
		try {
			setSaving(true);
			await deleteComment(postId, c.commentId);
			setComments((prev) => prev.filter((x) => x.commentId !== c.commentId));
			if (editingId === c.commentId) cancelEdit();
		} catch (e) {
			alert("댓글 삭제에 실패했습니다.");
		} finally {
			setSaving(false);
		}
	};

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
		<>
			<CommunityBaseStyle />
			<PageWrapper>
				<PostBox>
					<TitleRow>
						<PostTitle>{post.title}</PostTitle>
						<Nickname>글쓴이닉네임</Nickname>
					</TitleRow>
					<PostContent>{post.content}</PostContent>
				</PostBox>

				<Divider />

				<CommentList>
					{comments.map((cmt) => {
						const isMine = cmt.user_id === currentUserId;
						const isEditing = editingId === cmt.commentId;

						return isEditing ? (
							<EditItem key={cmt.commentId}>
								<EditHeader>
									<strong>{cmt.nickname}</strong>
								</EditHeader>
								<textarea
									rows={3}
									value={draft}
									onChange={(e) => setDraft(e.target.value)}
									placeholder="댓글 내용을 입력하세요"
								/>
								<EditActions>
									<PrimaryButton
										$small
										disabled={saving}
										onClick={() => saveEdit(cmt.commentId)}
									>
										저장
									</PrimaryButton>
									<PrimaryButton $small disabled={saving} onClick={cancelEdit}>
										취소
									</PrimaryButton>
								</EditActions>
							</EditItem>
						) : (
							<CommentItem
								key={cmt.commentId}
								nickname={cmt.nickname}
								content={cmt.content}
								avatarUrl={cmt.avatarUrl}
								onEdit={isMine ? () => startEdit(cmt) : undefined}
								onDelete={isMine ? () => removeComment(cmt) : undefined}
								isMyComment={isMine}
							/>
						);
					})}
				</CommentList>

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
		</>
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
`;

const PostTitle = styled.h2`
	font-size: 1.5rem;
	font-weight: 800;
	line-height: 1.4;
	margin: 0;
`;

const Nickname = styled.span`
	font-size: 1rem;
	color: #6b7280;
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

const EditItem = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	border: 1px solid #e5e7eb;
	border-radius: 12px;
	padding: 0.75rem 1rem;
	background: #fff;

	textarea {
		width: 100%;
		border: 1px solid #d1d5db;
		border-radius: 8px;
		padding: 0.5rem 0.75rem;
		resize: vertical;
		background: #fff;
	}
`;

const EditHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const EditActions = styled.div`
	display: flex;
	gap: 0.5rem;
`;
