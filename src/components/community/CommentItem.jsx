/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";

const CommentItem = ({
	nickname,
	content,
	avatarUrl,
	onEdit,
	onDelete,
	isMyComment,
}) => {
	return (
		<CommentContainer>
			<AvatarWrapper>
				<Avatar src={avatarUrl || "/default-avatar.png"} />
			</AvatarWrapper>

			<CommentBody>
				<NicknameAndActions>
					<Nickname>{nickname}</Nickname>
					{isMyComment && (
						<ActionButtons>
							<span onClick={onEdit}>수정</span>
							<span onClick={onDelete}>삭제</span>
						</ActionButtons>
					)}
				</NicknameAndActions>
				<CommentContent>{content}</CommentContent>
			</CommentBody>
		</CommentContainer>
	);
};

export default CommentItem;

const CommentContainer = styled.div`
	display: flex;
	border: 2px solid #d1d5db;
	border-radius: 12px;
	padding: 0.75rem 1rem;
	gap: 1rem;
	background-color: white;
`;

const AvatarWrapper = styled.div`
	flex-shrink: 0;
`;

const Avatar = styled.img`
	width: 40px;
	height: 40px;
	border-radius: 9999px;
	object-fit: cover;
`;

const CommentBody = styled.div`
	flex: 1;
`;

const NicknameAndActions = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Nickname = styled.div`
	font-weight: 600;
	font-size: 0.95rem;
`;

const ActionButtons = styled.div`
	font-size: 0.85rem;
	display: flex;
	gap: 0.5rem;
	color: #374151;
	cursor: pointer;

	span:hover {
		text-decoration: underline;
	}
`;

const CommentContent = styled.p`
	font-size: 0.9rem;
	margin-top: 0.25rem;
	color: rgba(0, 0, 0, 1);
	text-align: left;
`;
