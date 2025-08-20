/* eslint-disable react/prop-types */
import React, { useState, useMemo } from "react";
import styled, { css } from "styled-components";

const CategoryDropdown = ({
	options = [],
	selected,
	onChange,
	variant = "default",
}) => {

	const [open, setOpen] = useState(false);

	const current = useMemo(() => {
		if (!selected) return options[0] || null;
		if (typeof selected === "object") return selected;
		return (
			options.find((o) => Number(o.id) === Number(selected)) ||
			options[0] ||
			null
		);
	}, [selected, options]);

	
	const getLabel = (obj) => {
		if (!obj) return "";
		return obj.name ?? obj.categoryName ?? obj.label ?? "";
	};
	

	return (
		<DropdownContainer>
			<DropdownButton $variant={variant} onClick={() => setOpen((v) => !v)}>
				<Arrow>▼</Arrow>
				<SelectedText>{getLabel(current)}</SelectedText>
			</DropdownButton>

			{open && (
				<DropdownList $variant={variant}>
					{options.map((opt) => (
						<DropdownItem
							key={opt.id}
							$variant={variant}
							onClick={() => {
								onChange(opt);
								setOpen(false);
							}}
						>
							{opt.categoryName}
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
`;

const DropdownButton = styled.button`
	font-size: 1.25rem;
	font-weight: 700;
	width: 100%;
	height: 40px;
	padding: 4px 12px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	border-radius: 12px;

	${(props) =>
		props.$variant === "pink"
			? css`
					background-color: rgba(254, 245, 245, 1);
					border: 1px solid rgba(0, 0, 0, 1);
				`
			: css`
					background-color: white;
					border: 3px solid #000000;
				`}
`;

const Arrow = styled.span`
	font-size: 1.5rem;
	position: absolute;
	left: 1rem;
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
					background-color: rgba(254, 245, 245, 1);
					border: 1px solid rgba(0, 0, 0, 1);
				`
			: css`
					background-color: white;
					border: 3px solid #000000;
				`}
`;

const DropdownItem = styled.li`
	font-size: 1.25rem;
	font-weight: 700;
	padding: 10px 12px;
	color: #000000;
	text-align: center;
	cursor: pointer;

	background-color: ${(props) =>
		props.$variant === "pink" ? "rgba(254, 245, 245, 1)" : "white"};

	&:hover {
		background-color: #f3f4f6;
	}

	& + & {
		border-top: 1px solid #000000;
	}
`;
