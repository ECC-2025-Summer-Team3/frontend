/* eslint-disable react/prop-types */
import React from "react";
import {
  Card,
  CardTitle,
  CardContent,
  MetaRow,
} from "../../styles/CommunityStyle";

const PostPreviewCard = ({ title, content, onClick }) => {
  return (
    <Card onClick={onClick}>
      <CardTitle>{title}</CardTitle>
      <CardContent>{content}</CardContent>
      <MetaRow>
        <span>💬</span>
      </MetaRow>
    </Card>
  );
};

export default PostPreviewCard;