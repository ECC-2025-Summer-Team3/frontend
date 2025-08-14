import styled, { createGlobalStyle, css } from "styled-components";
import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";

/* 커뮤니티 전용 글로벌 스타일 */
export const CommunityBaseStyle = createGlobalStyle`
  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Inter', sans-serif;
    background: #fff;
    color: #111;
  }
`;

export const PageWrapper = styled.div`
  width: 100%;
  max-width: ${(props) => props.$maxWidth || "800px"};
  margin: 0 auto;
  padding: ${(props) => props.$padding || "2rem"};
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
`;

export const FormLabel = styled.label`
  display: block;
  font-weight: 700;
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
  text-align: left;
`;

const formControl = css`
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  font-size: 1rem;
  background-color: #fef5f5;
  &::placeholder { color: #9ca3af; }
`;

export const BaseInput = styled.input`
  ${formControl};
  padding: 0.625rem 1rem;
`;

export const BaseTextarea = styled.textarea`
  ${formControl};
  padding: 0.75rem 1rem;
  height: 160px;
  resize: vertical;
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
  text-align: left;
  min-height: ${(p) => p.$minHeight || "150px"};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
  cursor: ${(p) => (p.$clickable ? "pointer" : "default")};
`;

export const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: #000000;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
  text-align: left;
`;

export const CardContent = styled.div`
  background-color: #fef2f2;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  font-size: 0.875rem;
  line-height: 2.2;
  color: #333;
  min-height: calc(14px * 1.6 * 2);
  text-align: left;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  
  white-space: normal;
  word-break: break-word;
`;

export const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #4b5563;
  font-size: 0.875rem;
`;

export const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const AlertBar = styled.div`
  background: rgba(248, 117, 117, 0.56);
  color: #6b1e1e;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  position: relative;
  margin: 0 auto 1rem;
  max-width: ${(p) => p.$maxWidth || "800px"};
  text-align: left;
`;

export const CloseBtn = styled.button`
  position: absolute;
  right: 10px;
  top: 6px;
  border: none;
  background: transparent;
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
`;

export const Header = styled.h2`
  text-align: center;
  font-weight: 800;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`;
