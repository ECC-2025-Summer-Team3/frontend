import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	fetchStudyPostById,
	fetchStudyComments,
	createStudyComment,
	updateStudyComment,
	deleteStudyComment,
} from "../../services/StudyService";
import { fetchMyPage } from "../../services/UserService";
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
	const id = Number(postId);

	const [me, setMe] = useState(null);
	const [post, setPost] = useState(null);
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	const [editingId, setEditingId] = useState(null);
	const [draft, setDraft] = useState("");
	const [saving, setSaving] = useState(false);

	const [currentUserId, setCurrentUserId] = useState(null);


	useEffect(() => {
		const loadData = async () => {
			setIsLoading(true);
			try {
				// 현재 로그인 유저 id 가져오기
				const meRes = await fetchMyPage();
				setMe(meRes);
				setCurrentUserId(Number(meRes.id));

				// 게시글 + 댓글 조회
				const resPost = await fetchStudyPostById(id);
				const resComments = await fetchStudyComments(id);
				setPost(resPost);
				setComments(resComments);
			} catch (error) {
				console.error(error);
				alert("해당 글을 불러오지 못했습니다.");
			} finally {
				setIsLoading(false);
			}
		};
		loadData();
	}, [id]);

	const handleCommentSubmit = async () => {
		if (!newComment.trim()) return;
		try {
			await createStudyComment(id, { content: newComment });
			const res = await fetchStudyComments(id);
			setComments(res);
			setNewComment("");
		} catch (error) {
			console.error(error);
			alert("댓글 등록에 실패했습니다.");
		}
	};

	const startEdit = (c) => {
		if (Number(c.userId) !== Number(currentUserId)) return; // 내 댓글만 수정
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
			await updateStudyComment(commentId, { content });
			setComments((prev) =>
				prev.map((c) =>
					Number(c.commentId) === Number(commentId) ? { ...c, content } : c,
				),
			);
			cancelEdit();
		} catch (e) {
			console.error(e);
			alert("댓글 수정에 실패했습니다.");
		} finally {
			setSaving(false);
		}
	};

	const removeComment = async (c) => {
		if (Number(c.userId) !== Number(currentUserId)) return; // 내 댓글만 삭제
		if (!window.confirm("정말 삭제하시겠어요?")) return;
		try {
			setSaving(true);
			await deleteStudyComment(c.commentId);
			setComments((prev) =>
				prev.filter((x) => Number(x.commentId) !== Number(c.commentId)),
			);
			if (editingId === c.commentId) cancelEdit();
		} catch (e) {
			console.error(e);
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
						<PostTitle>{post?.title}</PostTitle>
						<Nickname>{post?.nickname ?? "익명"}</Nickname>
					</TitleRow>
					<PostContent>{post?.content}</PostContent>
				</PostBox>

				<Divider />

				<CommentList>
					{comments.map((cmt) => {
						const isMine = Number(cmt.userId) === Number(currentUserId);
						const isEditing = editingId === Number(cmt.commentId);
						const avatar = isMine ? me?.profileImage : undefined;

						return isEditing ? (
							<EditItem key={cmt.commentId}>
								<EditHeader>
									<strong>{cmt.nickname ?? "익명"}</strong>
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
								nickname={cmt.nickname ?? "익명"}
								content={cmt.content}
								profileImage={avatar}
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
	border: 0.1rem solid rgba(217, 217, 217, 1);
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
	text-align: left;
`;

const PostTitle = styled.h2`
	margin: 0.5rem 1rem 0rem 1rem;
	font-size: 1.5rem;
	font-weight: 800;
	line-height: 1.4;
`;

const Nickname = styled.span`
	font-size: 1rem;
	color: #6b7280;
`;

const PostContent = styled.div`
	margin: 1rem;
	font-size: 1rem;
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
