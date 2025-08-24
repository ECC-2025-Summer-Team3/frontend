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
		return obj.categoryName ?? "";
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
	max-width: 22rem;
`;

const DropdownButton = styled.button`
	font-size: 1.25rem;
	font-weight: 600;
	width: 100%;
	min-height: 2.5rem;
	padding: 0.25rem .75rem;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	border-radius: 1rem;

	${(props) =>
		props.$variant === "pink"
			? css`
					background-color: rgba(254, 245, 245, 1);
					border: 0.07rem solid rgba(0, 0, 0, 1);
				`
			: css`
					background-color: white;
					border: 0.1rem solid #000000;
				`}
`;

const Arrow = styled.span`
	font-size: 1.4rem;
	position: absolute;
	left: 1.3rem;
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
	margin-top: 0.25rem;
	padding: 0;
	z-index: 10;
	overflow: hidden;
	border-radius: 1rem;

	${(props) =>
		props.$variant === "pink"
			? css`
					background-color: rgba(254, 245, 245, 1);
					border: 0.07rem solid rgba(0, 0, 0, 1);
				`
			: css`
					background-color: white;
					border: 0.1rem solid #000000;
				`}
`;

const DropdownItem = styled.li`
	font-size: 1.25rem;
	font-weight: 600;
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
		border-top: 0.1rem solid #000000;
	}
`;
