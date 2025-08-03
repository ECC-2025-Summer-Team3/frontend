import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { fetchStudyPosts } from "../../services/studyService";
import StudyPostCard from "../../components/study/StudyPostCard";
import CategoryDropdown from "../../components/CategoryDropdown";

const StudyListPage = () => {
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("IT/정보통신");
  const navigate = useNavigate();

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const posts = await fetchStudyPosts();
        setPosts(posts);
      } catch (err) {
        alert("게시글을 불러오지 못했습니다.");
      }
    };
    loadPosts();
  }, []);

  const filteredPosts = posts.filter(
    (post) => post.category === selectedCategory,
  );

  return (
    <Container>
      {/* 카테고리 선택 */}
      <FlexCenter>
        <CategoryDropdown
          selected={selectedCategory}
          onChange={setSelectedCategory}
        />
      </FlexCenter>

      {/* 글 작성 버튼 */}
      <FlexEnd>
        <WriteButton onClick={() => navigate("/study/write")}>
          새 글 작성하기
        </WriteButton>
      </FlexEnd>

      {/* 게시글 리스트 */}
      <PostList>
        {filteredPosts.map((post) => (
          <StudyPostCard
            key={post.postId}
            post={post}
            onClick={() => navigate(`/study/${post.postId}`)}
          />
        ))}
      </PostList>
    </Container>
  );
};

export default StudyListPage;

const Container = styled.div`
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
  padding: 1.5rem;
`;

const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
`;

const FlexEnd = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
`;

const WriteButton = styled.button`
  width: 125px;
  height: 40px;
  font-size: 14px;
  font-weight: 500;
  background-color: white;
  color: #161515;
  border: 1px solid #161515;
  border-radius: 12px;
  cursor: pointer;

  transition: background-color 0.2s;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
