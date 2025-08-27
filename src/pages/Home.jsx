import React from "react";
import { useState } from "react";
import Calendar from "../components/Calendar.jsx";
import { GlobalCalendarStyle } from "../styles/CalendarStyle.jsx";
import {
	SearchBar,
	SearchIcon,
	SearchInput,
	PageWrapper,
	SearchWrapper,
	CalendarWrapper,
} from "../styles/HomeStyle.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchCategories } from "../services/CategoryService.js";
import { fetchCertificatesByCategory } from "../services/CertificateService.js";
import styled from "styled-components";

function Home() {
	const [value, setValue] = useState("");
	const [certificateList, setCertificateList] = useState([]);
	const [filter, setFilter] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			try {
				const categories = await fetchCategories();
				const certificates = await Promise.all(
					categories.map((d) => fetchCertificatesByCategory(d.categoryId)),
				);
				const data = certificates.flat();
				setCertificateList(data);
				console.log(data);
			} catch (e) {
				console.error(e);
			}
		})();
	}, []);

	const handleSearch = (e) => {
		const str = e.target.value;
		setValue(str);

		if (str.trim() === "") {
			setFilter([]);
			return;
		}

		const filtered = certificateList.filter((c) =>
			c.certificateName.toLowerCase().includes(str.toLowerCase()),
		);

		setFilter(filtered);
		console.log(filtered);
	};

	const handleDropDown = (id) => {
		navigate(`/certifiinfo/${id}`);
	};

	return (
		<PageWrapper>
			<SearchWrapper>
				<SearchBar>
					<SearchIcon />
					<SearchInput
						type="text"
						placeholder="원하시는 자격증을 검색해 보세요"
						value={value}
						onChange={handleSearch}
					/>
				</SearchBar>
				{filter.length > 0 && (
					<DropDown>
						{filter.map((f) => (
							<DropdownItem
								key={f.certificateId}
								onClick={() => handleDropDown(f.certificateId)}
							>
								{f.certificateName}
							</DropdownItem>
						))}
					</DropDown>
				)}
			</SearchWrapper>

			<CalendarWrapper>
				<GlobalCalendarStyle />
				<Calendar />
			</CalendarWrapper>
		</PageWrapper>
	);
}

export default Home;

const DropDown = styled.ul`
	position: absolute;
	top: 100%;
	left: 0;
	width: 200px;
	padding: 0;
	list-style: none;
	border: 1px solid #ccc;
	bottom-border-radius: 8px;
	background-color: white;
	max-height: 200px;
	overflow-y: auto;
	z-index: 10;
`;

const DropdownItem = styled.li`
	padding: 10px;
	cursor: pointer;

	&:hover {
		background-color: #f2f2f2;
	}
`;
