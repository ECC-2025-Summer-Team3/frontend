import { useState } from "react";
import styled, { css } from "styled-components";
import { CATEGORY_LIST } from "../../constants/categories.js";
import { media } from "../../styles/media";

const CategoryDropdown = ({ selected, onChange, variant = "default" }) => {
	const [open, setOpen] = useState(false);

	return (
		<DropdownContainer>
			{/* 드롭다운 버튼 */}
			<DropdownButton $variant={variant} onClick={() => setOpen(!open)}>
				<Arrow>▼</Arrow>
				<SelectedText>{selected}</SelectedText>
			</DropdownButton>

			{/* 드롭다운 목록 */}
			{open && (
				<DropdownList $variant={variant}>
					{CATEGORY_LIST.map((cat) => (
						<DropdownItem
							key={cat}
							$variant={variant}
							onClick={() => {
								onChange(cat);
								setOpen(false);
							}}
						>
							{cat}
						</DropdownItem>
					))}
				</DropdownList>
			)}
		</DropdownContainer>
	);
};

export default CategoryDropdown;

const DropdownContainer = styled.div`
	position: relative;
	width: 100%;
	max-width: 340px;

	${media.mobile`
    width: 100%;
	margin-bottom: 10px;
  `}
`;

const DropdownButton = styled.button`
	width: 100%;
	height: 40px;
	padding: 4px 12px;
	font-size: 1.25rem;
	font-weight: 700;
	font-family: "Inter", sans-serif;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	border-radius: 12px;

	${(props) =>
		props.$variant === "pink"
			? css`
					background-color: #fef5f5;
					border: 1px solid #d1d5db;
				`
			: css`
					background-color: white;
					border: 3px solid #000000;
				`}

	${media.mobile`
    font-size: 1rem;
    height: 36px;
    padding: 2px 8px;
  `}
`;

const Arrow = styled.span`
	position: absolute;
	left: 1rem;
	font-size: 1.5rem;

	${media.mobile`
    font-size: 1rem;
    left: 0.75rem;
  `}
`;

const SelectedText = styled.span`
	width: 100%;
	text-align: center;
`;

const DropdownList = styled.ul`
	position: absolute;
	top: 100%;
	left: 0;
	width: 100%;
	margin-top: 4px;
	padding: 0;
	z-index: 10;
	overflow: hidden;
	border-radius: 12px;

	${(props) =>
		props.$variant === "pink"
			? css`
					background-color: #fef5f5;
					border: 1px solid #d1d5db;
				`
			: css`
					background-color: white;
					border: 3px solid #000000;
				`}
`;

const DropdownItem = styled.li`
	padding: 10px 12px;
	font-size: 1.25rem;
	font-weight: 700;
	font-family: "Inter", sans-serif;
	color: #000000;
	text-align: center;
	cursor: pointer;

	background-color: ${(props) =>
		props.$variant === "pink" ? "#fef5f5" : "white"};

	&:hover {
		background-color: #f3f4f6;
	}

	& + & {
		border-top: 1px solid #000000;
	}

	${media.mobile`
    	font-size: 1rem;
    	padding: 6px 8px;
  	`}
`;
