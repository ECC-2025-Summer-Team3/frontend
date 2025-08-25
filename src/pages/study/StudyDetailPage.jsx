import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
	fetchStudyPostById,
	fetchStudyComments,
	createStudyComment,
	updateStudyComment,
	deleteStudyComment,
	updateStudyPost,
	deleteStudyPost,
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
	const navigate = useNavigate();

	const [me, setMe] = useState(null);
	const [post, setPost] = useState(null);
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	const [editingId, setEditingId] = useState(null);
	const [draft, setDraft] = useState("");
	const [saving, setSaving] = useState(false);

	const [editingPost, setEditingPost] = useState(false);
	const [postDraft, setPostDraft] = useState({ title: "", content: "" });

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

	useEffect(() => {
		if (post) {
			setPostDraft({
				title: post.title ?? "",
				content: post.content ?? "",
			});
		}
	}, [post]);

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

	const isOwner =
		currentUserId != null &&
		Number(post?.userId ?? post?.user?.id) === Number(currentUserId);

	const startPostEdit = () => {
		if (!isOwner) return;
		setEditingPost(true);
	};

	const cancelPostEdit = () => {
		setEditingPost(false);
		setPostDraft({
			title: post?.title ?? "",
			content: post?.content ?? "",
		});
	};

	const savePostEdit = async () => {
		const payload = {
			title: (postDraft.title ?? "").trim(),
			content: (postDraft.content ?? "").trim(),
		};
		if (!payload.title || !payload.content) {
			alert("제목과 내용을 입력하세요.");
			return;
		}
		try {
			setSaving(true);
			const updated = await updateStudyPost(id, payload);
			setPost(updated);
			setEditingPost(false);
			alert("수정 완료!");
		} catch (e) {
			console.error(e);
			alert("게시글 수정 실패");
		} finally {
			setSaving(false);
		}
	};

	const removePost = async () => {
		if (!isOwner) return;
		if (!window.confirm("정말 삭제하시겠습니까?")) return;
		try {
			setSaving(true);
			await deleteStudyPost(id);
			alert("삭제되었습니다.");
			navigate("/study/default");
		} catch (e) {
			console.error(e);
			alert("게시글 삭제 실패");
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
				{" "}
				<PostBox>
					<TitleRow>
						<LeftGroup>
							{!editingPost ? (
								<PostTitle>{post?.title}</PostTitle>
							) : (
								<PostInput
									value={postDraft.title}
									onChange={(e) =>
										setPostDraft((s) => ({ ...s, title: e.target.value }))
									}
									placeholder="제목"
								/>
							)}
							<Nickname>{post?.nickname ?? "익명"}</Nickname>
						</LeftGroup>

						{isOwner && (
							<RightActions $floating={!editingPost}>
								{!editingPost ? (
									<>
										<ActionLink onClick={startPostEdit}>수정</ActionLink>
										<ActionLink onClick={removePost}>삭제</ActionLink>
									</>
								) : (
									<>
										<ActionLink onClick={savePostEdit} disabled={saving}>
											저장
										</ActionLink>
										<ActionLink onClick={cancelPostEdit} disabled={saving}>
											취소
										</ActionLink>
									</>
								)}
							</RightActions>
						)}
					</TitleRow>

					{!editingPost ? (
						<PostContent>{post?.content}</PostContent>
					) : (
						<PostTextarea
							rows={10}
							value={postDraft.content}
							onChange={(e) =>
								setPostDraft((s) => ({ ...s, content: e.target.value }))
							}
							placeholder="내용을 입력하세요"
						/>
					)}
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
	position: relative;
`;

const TitleRow = styled.div`
	position: relative;
	display: flex;
	align-items: baseline;
	gap: 8px;
	padding: 0.25rem 0.75rem 0 1rem;
	flex-wrap: nowrap;
`;

const LeftGroup = styled.div`
	display: inline-flex;
	align-items: baseline;
	gap: 8px;
	min-width: 0;
	flex: 1 1 auto;
`;

const PostTitle = styled.h2`
	margin: 0.5rem 0 0 0;
	font-size: 1.5rem;
	font-weight: 800;
	line-height: 1.35;
	white-space: nowrap;
	text-overflow: ellipsis;
`;

const Nickname = styled.span`
	font-size: 1rem;
	color: #6b7280;
`;

const RightActions = styled.div`
	display: inline-flex;
	align-items: center;
	gap: 8px;
	margin-left: auto;
	white-space: nowrap;
	color: #6b7280;
	${({ $floating }) =>
		$floating
			? `
        position: absolute;
        right: 14px;
        top: 16px;           
      `
			: `
        margin-left: auto;     
      `}
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

const ActionLink = styled.button`
	border: 0;
	background: transparent;
	color: inherit;
	cursor: pointer;
	padding: 0;
	margin: 0;
	line-height: 1.2;
	&:hover {
		text-decoration: underline;
	}
	&:disabled {
		opacity: 0.6;
		cursor: default;
	}
`;

const PostInput = styled.input`
	border: 1px solid #e5e7eb;
	border-radius: 10px;
	padding: 8px 10px;
	font-size: 1rem;
	flex: 1 1 420px;
	min-width: 240px;
`;

const PostTextarea = styled.textarea`
	border: 1px solid #e5e7eb;
	border-radius: 10px;
	padding: 10px 12px;
	font-size: 1rem;
	margin: 1rem;
	line-height: 1.6;
	resize: vertical;
`;
