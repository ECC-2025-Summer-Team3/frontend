import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
	fetchUserComments,
	updateUserComment,
	deleteUserComment,
} from "../../services/UserService";
import {
	PageWrapper,
	Card,
	AlertBar,
	CloseBtn,
	Header,
} from "../../styles/CommunityStyle";

const MyCommentsPage = () => {
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [editingId, setEditingId] = useState(null);
	const [draft, setDraft] = useState("");
	const [saving, setSaving] = useState(false);
	const [toast, setToast] = useState("");

	const toArray = (raw) =>
		Array.isArray(raw) ? raw : Array.isArray(raw?.data) ? raw.data : [];

	const normalizeComments = (arr = []) =>
		arr
			.map((c) => ({
				id: Number(c.id ?? c.commentId),
				content: c.content ?? "",
				type: c.type ?? "",
				createdAt: c.createdAt ?? c.created_at ?? null,
				updatedAt: c.updatedAt ?? c.updated_at ?? null,
			}))
			.filter((x) => Number.isFinite(x.id))
			.sort(
				(a, b) =>
					new Date(b.updatedAt ?? b.createdAt) -
					new Date(a.updatedAt ?? a.createdAt),
			);

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const raw = await fetchUserComments();
				setItems(normalizeComments(toArray(raw)));
			} catch (e) {
				console.log("내 댓글을 불러오지 못했습니다.", e);
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	const startEdit = (c) => {
		setEditingId(c.id);
		setDraft(c.content);
	};
	const cancelEdit = () => {
		setEditingId(null);
		setDraft("");
	};

	const saveEdit = async (id, type) => {
		if (!draft.trim()) return alert("내용을 입력해주세요.");
		setSaving(true);
		try {
			await updateUserComment(type, id, draft.trim());
			setItems((prev) =>
				prev.map((x) =>
					x.id === id
						? {
								...x,
								content: draft.trim(),
								updatedAt: new Date().toISOString(),
							}
						: x,
				),
			);
			cancelEdit();
		} catch (e) {
			alert(e?.response?.data || e.message || "수정 실패");
		} finally {
			setSaving(false);
		}
	};

	const remove = async (id, type) => {
		if (!confirm("정말 삭제하시겠습니까?")) return;
		try {
			await deleteUserComment(type, id);
			setItems((prev) => prev.filter((x) => x.id !== id));
			setToast("삭제가 완료되었습니다");
			setTimeout(() => setToast(""), 3000);
		} catch (e) {
			alert(e?.response?.data || e.message || "삭제 실패");
		}
	};

	if (loading) return <Center>불러오는 중...</Center>;

	return (
		<PageWrapper>
			<Header>내가 작성한 댓글</Header>

			{toast && (
				<AlertBar role="alert">
					* {toast} *<CloseBtn onClick={() => setToast("")}>×</CloseBtn>
				</AlertBar>
			)}

			{items.length === 0 ? (
				<Empty>작성한 댓글이 없습니다.</Empty>
			) : (
				<List>
					{items.map((c) => (
						<Item key={c.id}>
							{editingId === c.id ? (
								<EditInput
									value={draft}
									onChange={(e) => setDraft(e.target.value)}
									maxLength={500}
								/>
							) : (
								<CommentTitle as="h2">{c.content}</CommentTitle>
							)}

							<BottomRow>
								<Meta>
									{c.type === "study"
										? "스터디"
										: c.type === "share"
											? "공유마당"
											: "분류 미정"}{" "}
									게시판에 남긴 댓글
								</Meta>
								<BtnGroup>
									{editingId === c.id ? (
										<>
											<BlackButton
												$small
												disabled={saving}
												onClick={() => saveEdit(c.id, c.type)}
											>
												{saving ? "저장중..." : "저장"}
											</BlackButton>
											<BlackButton $small type="button" onClick={cancelEdit}>
												취소
											</BlackButton>
										</>
									) : (
										<>
											<BlackButton $small onClick={() => startEdit(c)}>
												수정
											</BlackButton>
											<BlackButton
												$small
												type="button"
												onClick={() => remove(c.id, c.type)}
											>
												삭제
											</BlackButton>
										</>
									)}
								</BtnGroup>
							</BottomRow>
						</Item>
					))}
				</List>
			)}
		</PageWrapper>
	);
};

export default MyCommentsPage;

const Center = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 4rem 1rem;
	font-weight: 600;
`;

const List = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

const Item = styled(Card)`
	height: auto;
	gap: 10px;
	min-height: 0;
	justify-content: flex-start;
`;

const CommentTitle = styled.p`
	margin: 0;
	font-size: 20px;
	font-weight: 800;
	line-height: 1.35;
	word-break: break-word;
`;

const EditInput = styled.textarea`
	width: 100%;
	min-height: 88px;
	resize: vertical;
	border: 1px solid #d1d5db;
	border-radius: 12px;
	padding: 12px 14px;
	font-size: 16px;
	line-height: 1.45;
	background: #fff;
	outline: none;
`;

const BottomRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 12px;
	padding-top: 4px;
`;

const Meta = styled.span`
	font-size: 14px;
	color: #6b7280;
	line-height: 1.4;
`;

const BtnGroup = styled.div`
	display: flex;
	gap: 20px;
`;

const BlackButton = styled.button`
	background: #111827;
	color: #fff;
	border: 0;
	border-radius: 10px;
	padding: 8px 25px;
	line-height: 1;
	font-size: 14px;
	font-weight: 300;
	cursor: pointer;
`;

const Empty = styled.p`
	text-align: center;
	color: #6b7280;
`;
