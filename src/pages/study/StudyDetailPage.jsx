// src/pages/study/StudyDetailPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchStudyPostById,
  fetchComments,
  createComment,
} from "../../services/studyService";
import styled from "styled-components";
import CommentItem from "../../components/study/CommentItem"; // 새로 만든 댓글 컴포넌트

const StudyDetailPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const loadPost = async () => {
      try {
        const res = await fetchStudyPostById(postId);
        setPost(res);
      } catch (error) {
        alert("해당 글을 불러오지 못했습니다.");
      }
    };

    const loadComments = async () => {
      const res = await fetchComments(postId);
      setComments(res);
    };

    loadPost();
    loadComments();
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

  if (!post) return <Wrapper>로딩 중...</Wrapper>;
  const currentUserId = Number(localStorage.getItem("userId")) || 1;

  return (
    <Wrapper>
      {/* 글 내용 */}
      <PostBox>
        <TitleRow>
          <PostTitle>{post.title}</PostTitle>
          <Nickname>글쓴이닉네임</Nickname>
        </TitleRow>
        <PostContent>{post.content}</PostContent>
      </PostBox>

      {/* 구분선 */}
      <Divider />

      {/* 댓글 리스트 */}
      <CommentList>
        {comments.map((cmt) => (
          <CommentItem
            key={cmt.commentId}
            nickname={cmt.nickname}
            content={cmt.content}
            avatarUrl={cmt.avatarUrl} // 기본값이 없으면 default-avatar.png 사용됨
            onEdit={() => alert("수정 기능 준비중")}
            onDelete={() => alert("삭제 기능 준비중")}
            isMyComment={cmt.user_id === currentUserId}
          />
        ))}
      </CommentList>

      {/* 댓글 입력창 */}
      <CommentInputBox>
        <span style={{ marginRight: "0.5rem", fontSize: "1.2rem" }}>💬</span>
        <CommentInput
          placeholder="댓글을 입력하세요."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <SubmitButton onClick={handleCommentSubmit}>등록</SubmitButton>
      </CommentInputBox>
    </Wrapper>
  );
};

export default StudyDetailPage;


const Wrapper = styled.div`
  max-width: 720px;
  margin: 2rem auto;
  padding: 2rem;
`;

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
`;

const PostTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 800;
`;

const Nickname = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
`;

const PostContent = styled.div`
  font-size: 0.875rem;
  font-weight: 300;
  line-height: 1.0;
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
  justify-content: space-between;
  background-color: #eeeeee; // Figma: gray background
  border-radius: 12px;
  padding: 0.5rem 1rem;
`;

const CommentInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 1rem;
  font-weight: 500;
  color: #000;

  &::placeholder {
    color: #6b7280;
  }
`;

const SubmitButton = styled.button`
  margin-left: 0.5rem;
  background: white;
  color: #000;
  font-weight: 600;
  border: 1px solid #000;
  border-radius: 8px;
  padding: 0.4rem 0.75rem;
  cursor: pointer;

  &:hover {
    background-color: #f3f3f3;
  }
`;