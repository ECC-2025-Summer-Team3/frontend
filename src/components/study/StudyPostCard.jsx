import styled from "styled-components";

const StudyPostCard = ({ post, onClick }) => {
  return (
    <Card onClick={onClick}>
      <Title>{post.title}</Title>
      <Content>{post.content}</Content>
      <div style={{ display: "flex", alignItems: "center", gap: "0.25", color: "#4b5563", fontSize: "0.875rem" }}>
        <span>💬</span>
      </div>
    </Card>
  );
};

export default StudyPostCard;

const Card = styled.div`
	background-color: rgba(217, 217, 217, 0.56);
	border-radius: 15px;
	padding: 1rem;
	cursor: pointer;
	text-align: left;
	height: 150px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 0.5rem;
`;

const Title = styled.h2`
	font-size: 1.25rem; /* 20px */
	font-weight: 700;
	font-family: 'Inter', sans-serif;
	color: #000000;
	line-height: 1.4;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	margin: 0;
`;

const Content = styled.div`
	background-color: #fef2f2;
	padding: 0.5rem 0.75rem;
	border-radius: 8px;
	font-size: 0.875rem;
	line-height: 1.7;
	color: #333;
	min-height: calc(14px * 1.6 * 2);

	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;

	white-space: normal;
	word-break: break-word;
`;
