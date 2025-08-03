import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CategoryDropdown from "../../components/CategoryDropdown";
import { createStudyPost } from "../../services/studyService";

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
            <Label>카테고리 선택</Label>
				<CategoryDropdown selected={category} onChange={setCategory} variant="pink"/>
          </FormGroup>

          {/* 제목 */}
          <FormGroup>
            <Label>제목</Label>
            <Input
              type="text"
              placeholder="제목을 입력해 주세요."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormGroup>

          {/* 내용 */}
          <FormGroup>
            <Label>내용</Label>
            <Textarea
              placeholder="내용을 입력해 주세요."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </FormGroup>
        </FormWrapper>

        {/* 등록 버튼 (form 밖) */}
        <ButtonOutsideWrap>
          <SubmitButton onClick={handleSubmit}>등록하기</SubmitButton>
        </ButtonOutsideWrap>
      </ContentBox>
    </PageWrapper>
  );
};

export default StudyWritePage;

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: white;
  display: flex;
  justify-content: center;
  padding: 2.5rem 1rem;
`;

const ContentBox = styled.div`
  width: 100%;
  max-width: 640px;
`;

const FormWrapper = styled.div`
  background-color: #f3f4f6;
  border-radius: 16px;
  padding: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;


const Label = styled.label`
  display: block;
  font-weight: 700;
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
  text-align: left;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.625rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  font-size: 1rem;
  background-color: #fef5f5;

  &::placeholder {
    color: #9ca3af;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  height: 160px;
  resize: vertical;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  font-size: 1rem;
  background-color: #fef5f5;

  &::placeholder {
    color: #9ca3af;
  }
`;

const ButtonOutsideWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const SubmitButton = styled.button`
  padding: 0.5rem 1.25rem;
  background-color: white;
  color: #000;
  border: 1px solid #000;
  border-radius: 8px;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #f3f3f3;
  }
`;
