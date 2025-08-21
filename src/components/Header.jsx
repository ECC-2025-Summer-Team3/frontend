// menu의 Route 다시확인

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchCertificatesByCategory } from "../services/CertificateService";
import { fetchCategories } from "../services/CategoryService";
import { UsergroupDeleteOutlined } from "@ant-design/icons";

const Header = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const [categories, setCategories] = useState([]);
	const [certificates, setCertificates] = useState([]);

	const [hover, setHover] = useState(null);
	const [open, setOpen] = useState(false);

	// 카테고리 전체 조회
	useEffect(() => {
		(async () => {
			try {
				const data = await fetchCategories();
				const list = Array.isArray(data)
					? data
					: Array.isArray(data?.data)
						? data.data
						: [];
				setCategories(list);
				if (data.length > 0) {
					setHover(data[0].categoryId);
				}
			} catch (err) {
				console.error(err);
			}
		})();
	}, []);

	// 카테고리별 자격증 목록 조회
	useEffect(() => {
		if (hover == null) return;
		(async () => {
			try {
				const data = await fetchCertificatesByCategory(hover);
				setCertificates(data);
			} catch (err) {
				console.error(err);
			}
		})();
	}, [hover]);

	useEffect(() => {
		setOpen(false);
	}, [location.pathname]);

	const menu = [
		{ path: "/home", label: "시험 일정" }, //Route 다시 확인
		{ path: "/certifiinfo", label: "자격증", isOpen: true }, //Route 다시 확인
		{ path: "/study/default", label: "스터디 모집" },
		{ path: "/share/default", label: "공유마당" },
		{ path: "/mypage", label: "마이 페이지" }, //Route 다시 확인
	];

	const goLogin = () => {
		const ok = window.confirm("정말 로그아웃 하시겠습니까?");
		if (!ok) return;
		navigate("/login", { replace: true }); //Route 다시 확인
	};

	return (
		<Bar onMouseLeave={() => setOpen(false)}>
			{" "}
			<Logo onMouseEnter={() => setOpen(false)}>Certif</Logo>
			<Nav>
				{menu.map((m) =>
					m.isOpen ? (
						<MegaWrapper
							key={m.path}
							onMouseEnter={() => setOpen(true)}
							onMouseLeave={() => setOpen(false)}
						>
							<NavItem as="div" $active={open} role="button">
								{m.label}
							</NavItem>

							{open && (
								<MegaPanel>
									<Inner>
										<CatTabs>
											{categories.map((c) => (
												<CatTab
													key={c.categoryId}
													$active={hover === c.categoryId}
													onMouseEnter={() => setHover(c.categoryId)}
												>
													{c.categoryName}
												</CatTab>
											))}
										</CatTabs>

										<ItemsRow>
											{certificates.map((cert) => (
												<ItemLink
													key={cert.certificateId}
													to={`/certifiinfo/${cert.certificateId}`}
												>
													{cert.certificateName}
												</ItemLink>
											))}
										</ItemsRow>
									</Inner>
								</MegaPanel>
							)}
						</MegaWrapper>
					) : (
						<NavItem
							key={m.path}
							to={m.path}
							$active={location.pathname.startsWith(m.path)}
							onMouseEnter={() => setOpen(false)}
						>
							{m.label}
						</NavItem>
					),
				)}
			</Nav>
			<LogoutBtn onClick={goLogin}>
				<UsergroupDeleteOutlined style={{ fontSize: "32px" }} />
				<span style={{ fontSize: "14px" }}>logout</span>
			</LogoutBtn>
		</Bar>
	);
};

export default Header;

const Bar = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 12px 24px;
	border-bottom: 1px solid #e5e7eb;
	background: #fff;
	position: sticky;
	top: 0;
	z-index: 50;
	position: relative;
`;

const Logo = styled.div`
	font-family: "Inter", sans-serif;
	font-size: 32px;
	font-weight: 700;
	color: #000;
	cursor: pointer;
	text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const Nav = styled.nav`
	display: flex;
	flex: 1;
	justify-content: center;
	gap: 60px;
	position: relative;
	z-index: 40;
`;

const NavItem = styled(Link)`
	font-size: 1.2rem;
	font-weight: 600;
	padding: 8px 14px;
	border-radius: 12px;
	text-decoration: none;
	color: #111;
	background: ${({ $active }) => ($active ? "#e5e5e5" : "transparent")};
	&:hover {
		background: #f3f3f3;
	}
`;

const LogoutBtn = styled.button`
	display: flex;
	flex-direction: column;
	align-items: center;
	background: none;
	border: none;
	font-size: 0.95rem;
	cursor: pointer;
	color: #333;
	&:hover {
		color: #000;
	}
`;

const MegaWrapper = styled.div`
	position: relative;
`;

const MegaPanel = styled.div`
	position: absolute;
	left: 24px;
	right: 24px;
	top: 48px;
	z-index: 45;
`;

const Inner = styled.div`
	background: #f3f3f3;
	border: 1px solid #e5e7eb;
	border-radius: 16px;
	padding: 16px 20px;
	box-shadow: 0 10px 24px rgba(0, 0, 0, 0.06);
`;

const CatTabs = styled.div`
	display: grid;
	grid-auto-flow: column;
	gap: 12px;
	overflow-x: auto;
	padding: 4px 2px;
`;

const CatTab = styled.button`
	white-space: nowrap;
	padding: 10px 14px;
	border-radius: 12px;
	border: 1px solid #dedede;
	background: ${({ $active }) => ($active ? "#e1e1e1" : "#efefef")};
	font-weight: 700;
	cursor: pointer;
	&:hover {
		background: #e7e7e7;
	}
`;

const ItemsRow = styled.div`
	margin-top: 10px;
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	gap: 12px 28px;
	@media (max-width: 900px) {
		grid-template-columns: repeat(3, 1fr);
	}
`;

const ItemLink = styled(Link)`
	color: #222;
	font-weight: 600;
	text-decoration: none;
	&:hover {
		text-decoration: underline;
	}
`;
