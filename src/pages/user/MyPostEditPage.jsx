import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import CategoryDropdown from "../../components/community/CategoryDropdown";
import { fetchMyPostById, updateMyPost } from "../../services/StudyService";
import {
	PageWrapper,
	FormLabel,
	BaseInput,
	BaseTextarea,
	PrimaryButton,
} from "../../styles/CommunityStyle";

const StudyEditPage = () => {
	const { postId } = useParams();
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const navigate = useNavigate();

	const [category, setCategory] = useState("IT/정보통신");
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	useEffect(() => {
		const load = async () => {
			try {
				const data = await fetchMyPostById(postId);
				setTitle(data.title ?? "");
				setContent(data.content ?? "");
				if (data.category) setCategory(data.category);
			} catch (e) {
				alert("글 정보를 불러오지 못했습니다.");
				navigate(-1);
			} finally {
				setLoading(false);
			}
		};
		load();
	}, [postId, navigate]);

	const handleSubmit = async () => {
		if (!title.trim() || !content.trim()) {
			alert("제목과 내용을 입력해 주세요!");
			return;
		}
		setSaving(true);
		try {
			const payload = { title, content };
			await updateMyPost(postId, payload);
			navigate("/user/my-posts", { state: { updated: true } });
		} catch (e) {
			console.error(e);
			alert(e.message || "글 수정에 실패했습니다.");
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
						<FormLabel>카테고리 선택</FormLabel>
						<CategoryDropdown
							selected={category}
							onChange={setCategory}
							variant="pink"
						/>
					</FormGroup>

					{/* 제목 */}
					<FormGroup>
						<FormLabel>제목</FormLabel>
						<BaseInput
							type="text"
							placeholder="원래 제목"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</FormGroup>

					{/* 내용 */}
					<FormGroup>
						<FormLabel>내용</FormLabel>
						<BaseTextarea
							placeholder="원래 내용"
							value={content}
							onChange={(e) => setContent(e.target.value)}
							rows={10}
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

export default StudyEditPage;

const ContentBox = styled.div`
	width: 100%;
	max-width: 768px;
`;

const FormWrapper = styled.div`
	background-color: #f3f4f6;
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
