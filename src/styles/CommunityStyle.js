import styled from "styled-components";
import { media } from "./media";

export const PageWrapper = styled.div`
  width: 100%;
  max-width: ${(props) => props.maxWidth || "800px"};
  margin: 0 auto;
  padding: ${(props) => props.$padding || "2rem"};

  ${media.mobile`
    max-width: 100%;
    padding: 1rem 1rem;
  `}
`;

export const PrimaryButton = styled.button`
  padding: ${(props) => (props.$small ? "0.4rem 0.75rem" : "0.5rem 1.25rem")};
  font-size: ${(props) => (props.$small ? "0.875rem" : "1rem")};
  font-weight: 500;
  background-color: white;
  color: #4b4b4b;
  border: 1px solid #000;
  border-radius: 8px;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f3f3f3;
  }

  ${media.mobile`
    font-size: 0.875rem;
    padding: 0.4rem 0.75rem;
    border-radius: 6px;
  `}
`;

export const FormLabel = styled.label`
  display: block;
  font-weight: 700;
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
  text-align: left;

  ${media.mobile`
    font-size: 1rem;
  `}
`;

export const BaseInput = styled.input`
  width: 100%;
  padding: 0.625rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  font-size: 1rem;
  background-color: #fef5f5;

  &::placeholder {
    color: #9ca3af;
  }

  ${media.mobile`
    font-size: 0.875rem;
  `}
`;

export const BaseTextarea = styled.textarea`
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

  ${media.mobile`
    font-size: 0.875rem;
  `}
`;

export const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
`;

export const FlexEnd = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.25rem;
`;

export const Card = styled.div`
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
  width: 100%;

  ${media.mobile`
    padding: 0.75rem;
    font-size: 0.875rem;
    border-radius: 12px;
  `}
`;

export const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  font-family: "Inter", sans-serif;
  color: #000000;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;

  ${media.mobile`
    font-size: 1rem;
    line-height: 1.2;
  `}
`;

export const CardContent = styled.div`
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

  ${media.mobile`
    font-size: 0.75rem;
    padding: 0.5rem;
  `}
`;

export const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #4b5563;
  font-size: 0.875rem;

  ${media.mobile`
    font-size: 0.75rem;
  `}
`;

export const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
