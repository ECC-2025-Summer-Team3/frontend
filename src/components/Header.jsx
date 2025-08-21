// const menu에서 라우팅 다시확인
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
	const [certByCat, setCertByCat] = useState({});
	const [open, setOpen] = useState(false);

	const toArray = (raw) =>
		Array.isArray(raw) ? raw : Array.isArray(raw?.data) ? raw.data : [];

	useEffect(() => {
		(async () => {
			try {
				const raw = await fetchCategories();
				const sorted = toArray(raw)
					.map((c) => ({
						...c,
						categoryId: Number(c.categoryId ?? c.id),
					}))
					.sort((a, b) => a.categoryId - b.categoryId);

				setCategories(sorted);

				const entries = await Promise.all(
					sorted.map(async (c) => {
						try {
							const arrRaw = await fetchCertificatesByCategory(c.categoryId);
							const arr = toArray(arrRaw);
							return [String(c.categoryId), arr];
						} catch {
							return [String(c.categoryId), []];
						}
					}),
				);
				setCertByCat(Object.fromEntries(entries));
			} catch (err) {
				console.error(err);
			}
		})();
	}, []);

	useEffect(() => {
		setOpen(false);
	}, [location.pathname]);

	// 라우팅 다시 확인!
	const menu = [
		{ path: "/home", label: "시험 일정" },
		{ path: "/certifiinfo", label: "자격증", isOpen: true },
		{ path: "/study/default", label: "스터디 모집" },
		{ path: "/share/default", label: "공유마당" },
		{ path: "/mypage", label: "마이 페이지" },
	];

	const goLogin = () => {
		const ok = window.confirm("정말 로그아웃 하시겠습니까?");
		if (!ok) return;
		navigate("/login", { replace: true });
	};

	useEffect(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);

	return (
		<Bar>
			<Logo onMouseEnter={() => setOpen(false)}>Certif</Logo>

			<Nav>
				{menu.map((m) =>
					m.isOpen ? (
						<MegaWrapper key={m.path}>
							<NavItem
								as="div"
								$active={open}
								role="button"
								onMouseEnter={() => setOpen(true)}
							>
								{m.label}
							</NavItem>

							{open && (
								<>
									<Backdrop onClick={() => setOpen(false)} />
									<MegaPanel
										onMouseEnter={() => setOpen(true)}
										onMouseLeave={() => setOpen(false)}
									>
										<Inner>
											<CatBar>
												{categories.map((c) => (
													<CatLabel key={c.categoryId}>
														{c.categoryName}
													</CatLabel>
												))}
											</CatBar>

											<ItemsGrid>
												{categories.map((c) => {
													const items = certByCat[c.categoryId] ?? [];
													return (
														<Col key={c.categoryId}>
															{items.length === 0 ? (
																<EmptyItem>항목 없음</EmptyItem>
															) : (
																items.map((cert) => (
																	<ItemLink
																		key={cert.certificateId}
																		to={`/certifiinfo/${cert.certificateId}`}
																	>
																		{cert.certificateName}
																	</ItemLink>
																))
															)}
														</Col>
													);
												})}
											</ItemsGrid>
										</Inner>
									</MegaPanel>
								</>
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
				<UsergroupDeleteOutlined style={{ fontSize: "25px" }} />
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
	padding: 0px 20px 18px;
	border-bottom: 1px solid #e5e7eb;
	background: #fff;
	position: sticky;
	top: 0;
	z-index: 100;
	height: clamp(2.5rem, 4vw, 3rem);
`;

const Logo = styled.div`
	font-family: "Inter", sans-serif;
	font-size: clamp(2rem, 3vw, 2.5rem);
	transition: font-size 0.5s ease;
	font-size: clamp(2rem, 3vw, 2.5rem);
	transition: font-size 0.5s ease;
	font-weight: 700;
	color: #000;
	cursor: pointer;
	text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const Nav = styled.nav`
	display: flex;
	flex: 1;
	justify-content: center;
	gap: clamp(16px, 5vw, 50px);
	z-index: 40;
	white-space: nowrap;
	white-space: nowrap;
`;

const NavItem = styled(Link)`
	font-size: clamp(0.8rem, 1.2vw, 1.2rem);
	font-size: clamp(0.8rem, 1.2vw, 1.2rem);
	font-weight: 600;
	padding: 8px 14px;
	border-radius: 12px;
	text-decoration: none;
	color: #111;
	background: ${({ $active }) => ($active ? "#e5e5e5" : "transparent")};
	transition: font-size 0.2s ease;
	transition: font-size 0.2s ease;
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
	font-size: 0.8rem;
	cursor: pointer;
	color: #333;
	&:hover {
		color: #000;
	}
`;

const MegaWrapper = styled.div``;

const MegaPanel = styled.div`
	position: fixed;
	top: clamp(2rem, 10vh, 6rem);
	left: 50%;
	transform: translateX(-50%);
	width: min(1100px, calc(100% - 48px));
	z-index: 70;
	display: block;
`;

const Inner = styled.div`
	width: 100%;
	max-width: none;
	margin: 0;
	display: flex;
	flex-direction: column;
	gap: 16px;
	text-align: left;
`;

const CatBar = styled.div`
	background: #efefef;
	border-radius: 16px;
	padding: 14px 24px;
	display: grid;
	grid-template-columns: repeat(7, minmax(0, 1fr));
	gap: 16px 28px;
	justify-items: start;
	align-items: center;
`;

const CatLabel = styled.div`
	font-weight: 700;
	white-space: nowrap;
	font-size: 1.1rem;
	line-height: 1.7;
	width: 100%;
	text-align: left;
	display: block;
	width: 100%;
	min-width: 0;
	white-space: nowrap;
	word-break: keep-all;
	overflow: hidden;
	text-overflow: ellipsis;
	display: block;
`;

const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 12px 28px;    
  padding: 0 24px;    
  justify-items: start;  
  align-items: start;
`;

const Col = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	min-width: 0;
	align-items: center;
`;

const ItemLink = styled(Link)`
	color: #222;
	text-decoration: none;
	line-height: 2;
	font-weight: 500;
	&:hover {
		text-decoration: underline;
	}
	display: block;
	width: 100%;
	max-width: 100%;
	white-space: nowrap;
	word-break: keep-all;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const EmptyItem = styled.div`
	color: #9ca3af;
	font-weight: 600;
`;

const Backdrop = styled.div`
	position: fixed;
	top: clamp(2rem, 10vh, 6rem);
	left: 0;
	right: 0;
	bottom: 0;
	background: #fff;
	z-index: 60;
`;
