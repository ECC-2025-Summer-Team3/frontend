import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CategoryDropdown from "../../components/community/CategoryDropdown";
import { createStudyPost } from "../../services/StudyService";
import {
	PageWrapper,
	FormLabel,
	BaseInput,
	BaseTextarea,
	PrimaryButton,
} from "../../styles/CommunityStyle";

const StudyWritePage = () => {
	const [category, setCategory] = useState("IT/정보통신");
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async () => {
		if (!title.trim() || !content.trim()) {
			alert("제목과 내용을 입력해 주세요!");
			return;
		}

		const postData = { title, content, category };

		try {
			await createStudyPost(postData);
			alert("글이 등록되었습니다!");
			navigate("/study");
		} catch (error) {
			console.error(error);
			alert(error.message || "글 등록에 실패했습니다.");
		}
	};

	return (
		<PageWrapper>
			<ContentBox>
				<FormWrapper>
					{/* 카테고리 */}
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
							placeholder="제목을 입력해 주세요."
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</FormGroup>

					{/* 내용 */}
					<FormGroup>
						<FormLabel>내용</FormLabel>
						<BaseTextarea
							placeholder="내용을 입력해 주세요."
							value={content}
							onChange={(e) => setContent(e.target.value)}
						/>
					</FormGroup>
				</FormWrapper>

				{/* 등록 버튼 */}
				<ButtonOutsideWrap>
					<PrimaryButton onClick={handleSubmit}>등록하기</PrimaryButton>
				</ButtonOutsideWrap>
			</ContentBox>
		</PageWrapper>
	);
};

export default StudyWritePage;

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
