import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate, matchPath } from "react-router-dom";
import { fetchCertificatesByCategory } from "../services/CertificateService";
import { fetchCategories } from "../services/CategoryService";
import {
	UsergroupDeleteOutlined,
	UsergroupAddOutlined,
} from "@ant-design/icons";
import certif_logo from "../assets/certif_logo.png";
import { logoutUser } from "../services/AuthService";
import http from "../utils/http";

const Header = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [isLoggedin, setIsLoggedin] = useState(
		Boolean(localStorage.getItem("token")),
	);
	const [categories, setCategories] = useState([]);
	const [certByCat, setCertByCat] = useState({});
	const [open, setOpen] = useState(false);

	const toArray = (raw) =>
		Array.isArray(raw) ? raw : Array.isArray(raw?.data) ? raw.data : [];

	useEffect(() => {
		const sync = () => setIsLoggedin(Boolean(localStorage.getItem("token")));
		window.addEventListener("storage", sync);
		window.addEventListener("auth-changed", sync);
		return () => {
			window.removeEventListener("storage", sync);
			window.removeEventListener("auth-changed", sync);
		};
	}, []);

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
	}, [isLoggedin]);

	useEffect(() => {
		setOpen(false);
	}, [location.pathname]);

	useEffect(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => (document.body.style.overflow = "");
	}, [open]);

	const menu = [
		{ path: "/", label: "시험 일정" }, //Route 다시 확인
		{
			path: "/certifiinfo",
			label: "자격증",
			isOpen: true,
			openOnly: true,
		}, //Route 다시 확인
		{ path: "/study/default", label: "스터디 모집" },
		{ path: "/share/default", label: "공유마당" },
		{ path: "/mypage", label: "마이 페이지" },
	];

	const handleLogin = () => {
		navigate("/login");
	};

	const handleLogout = async (e) => {
		e.preventDefault();
		if (!window.confirm("정말 로그아웃 하시겠습니까?")) return;

		try {
			await logoutUser();
		} catch (err) {
			console.warn("logout failed; clearing local token anyway", err);
		} finally {
			localStorage.removeItem("token");
			try {
				delete http.defaults.headers.common.Authorization;
			} catch {
				//
			}
			setIsLoggedin(false);
			window.dispatchEvent(new Event("auth-changed"));
			navigate("/");
			alert("로그아웃 되었습니다.");
		}
	};

	const activePatternOf = (path) => {
		if (path === "/") return "/";
		const root = "/" + path.split("/")[1];
		return `${root}/*`;
	};
	const isActive = (path) => {
		const pattern = activePatternOf(path);
		return pattern === "/"
			? location.pathname === "/"
			: !!matchPath(pattern, location.pathname);
	};

	return (
		<Bar>
			<Logo to="/" onMouseEnter={() => setOpen(false)}>
				<img src={certif_logo} alt="Certif logo" />
			</Logo>

			<Nav>
				{menu.map((m) =>
					m.isOpen ? (
						<MegaWrapper key={m.path}>
							<NavItem
								as={Link}
								to={m.path}
								role="button"
								$active={open || isActive(m.path)}
								onMouseEnter={() => setOpen(true)}
								onClick={m.openOnly ? (e) => { e.preventDefault(); setOpen(v => !v); } : undefined}
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
							$active={isActive(m.path)}
							onMouseEnter={() => setOpen(false)}
						>
							{m.label}
						</NavItem>
					),
				)}
			</Nav>

			{isLoggedin ? (
				<LogoutBtn onClick={handleLogout}>
					<UsergroupDeleteOutlined style={{ fontSize: "25px" }} />
					<span style={{ fontSize: "14px" }}>logout</span>
				</LogoutBtn>
			) : (
				<LoginBtn onClick={handleLogin}>
					<UsergroupAddOutlined style={{ fontSize: "25px" }} />
					<span style={{ fontSize: "14px" }}>login</span>
				</LoginBtn>
			)}
		</Bar>
	);
};

export default Header;

const Bar = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 1rem 0.6rem;
	border-bottom: 1px solid #e5e7eb;
	background: #fff;
	position: sticky;
	top: 0;
	z-index: 100;
	height: clamp(2.5rem, 4vw, 3rem);
	overflow: visible;
`;

const Logo = styled.div`
	display: flex;
	align-items: center;
	height: clamp(40px, 7vw, 56px);  
	line-height: 0;
	text-decoration: none;
	cursor: pointer;
	img {
		height: 100%;
		width: auto;
		display: block;
		transform: scale(1.6);
		transform-origin: left center;
	}
`;

const Nav = styled.nav`
	display: flex;
	flex: 1;
	justify-content: center;
	align-items: center;
	gap: clamp(16px, 5vw, 50px);
	z-index: 40;
	white-space: nowrap;
`;

const NavItem = styled(Link)`
	font-size: clamp(0.8rem, 1.2vw, 1.2rem);
	transition: font-size 0.2s ease;
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

const LoginBtn = styled.button`
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

const LogoutBtn = styled(LoginBtn)``;

const MegaWrapper = styled.div``;

const MegaPanel = styled.div`
	position: absolute;
	top: calc(100% + 5px);
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
	font-size: clamp(0.8rem, 1.2vw, 1.2rem);
	transition: font-size 0.2s ease;
	font-weight: 700;
	white-space: nowrap;
	line-height: 1.7;
	width: 100%;
	text-align: left;
	display: block;
	width: 100%;
	min-width: 0;
	white-space: nowrap;
	word-break: keep-all;
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
	font-size: clamp(0.5rem, 1vw, 1rem);
	transition: font-size 0.2s ease;
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
