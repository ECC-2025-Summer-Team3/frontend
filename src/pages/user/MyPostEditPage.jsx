import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchUserPostById, updateUserPost } from "../../services/UserService";
import { fetchCategoryById } from "../../services/CategoryService";
import { fetchStudyPostById } from "../../services/StudyService";
import { fetchSharePostById } from "../../services/ShareService";
import {
	PageWrapper,
	FormLabel,
	BaseInput,
	BaseTextarea,
	PrimaryButton,
} from "../../styles/CommunityStyle";

const MyPostEditPage = () => {
	const { type, postId } = useParams();
	const navigate = useNavigate();

	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [categoryName, setCategoryName] = useState("");

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);

				const my = await fetchUserPostById(type, postId);
				setTitle(my?.title ?? "");
				setContent(my?.content ?? "");

				let detail = null;
				if (type === "study") detail = await fetchStudyPostById(postId);
				if (type === "share") detail = await fetchSharePostById(postId);

				const name = detail.categoryName;
				if (name) {
					setCategoryName(name);
				} else if (detail?.categoryId != null) {
					const cat = await fetchCategoryById(detail.categoryId);
					setCategoryName(cat?.categoryName ?? "");
				} else {
					setCategoryName("");
				}
			} catch (e) {
				console.error(e);
				alert("글 정보를 불러오지 못했습니다.");
				navigate(-1);
			} finally {
				setLoading(false);
			}
		})();
	}, [type, postId, navigate]);

	const handleSubmit = async () => {
		const t = title.trim();
		const c = content.trim();
		if (!t || !c) return alert("제목과 내용을 입력해 주세요!");
		setSaving(true);
		try {
			await updateUserPost(type, postId, { title: t, content: c });
			navigate("/user/my-posts", { state: { updated: true } });
		} catch (e) {
			console.error(e);
			alert("글 수정에 실패했습니다.");
		} finally {
			setSaving(false);
		}
	};

	if (loading) return <PageWrapper>불러오는 중...</PageWrapper>;

	return (
		<PageWrapper>
			<ContentBox>
				<FormWrapper>
					<FormGroup>
						<FormLabel>카테고리</FormLabel>
						<ReadOnlyBox>{categoryName || "—"}</ReadOnlyBox>
					</FormGroup>

					<FormGroup>
						<FormLabel>제목</FormLabel>
						<BaseInput
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</FormGroup>

					<FormGroup>
						<FormLabel>내용</FormLabel>
						<BaseTextarea
							rows={10}
							value={content}
							onChange={(e) => setContent(e.target.value)}
						/>
					</FormGroup>
				</FormWrapper>

				<ButtonOutsideWrap>
					<PrimaryButton onClick={handleSubmit} disabled={saving}>
						{saving ? "수정중..." : "수정하기"}
					</PrimaryButton>
				</ButtonOutsideWrap>
			</ContentBox>
		</PageWrapper>
	);
};

export default MyPostEditPage;

const ContentBox = styled.div`
	width: 100%;
	max-width: 768px;
`;
const FormWrapper = styled.div`
	background: #f3f4f6;
	border-radius: 16px;
	padding: 2rem;
`;
const FormGroup = styled.div`
	margin-bottom: 1.5rem;
`;
const ButtonOutsideWrap = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-top: 1rem;
`;
const ReadOnlyBox = styled.div`
  background-color: rgba(254, 245, 245, 1);
  border: 1px solid #e5e7eb;
  border-radius: 12px;

  font-size: 1.25rem;
  font-weight: 700;
  color: #000;

  padding: 8px 12px;    
  text-align: center;
  max-width: 340px;
`;
