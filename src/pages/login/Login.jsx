import React from "react";
import { useState, useEffect } from "react";
import "antd/dist/reset.css";
import certif_logo from "../../assets/certif_logo.png";
import { useNavigate } from "react-router-dom";
import { CloseCircleOutlined } from "@ant-design/icons";
import {
	PageWrapper,
	LoginMessage,
	InstText,
	InputText,
	Blank,
	LoginButton,
	LoginCheck,
	WidthWrapper,
	Divide,
	SignButton,
} from "../../styles/UserStyle";
import styled from "styled-components";
import { loginUser } from "../../services/AuthService";

function Login() {
	const [Id, setId] = useState("");
	const [Pw, setPw] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [checked, setChecked] = useState(false);

	const isEnabled = Id.trim() !== "" && Pw.trim() !== "";

	const navigate = useNavigate();
	const handleSignupBtn = () => {
		navigate("/signup");
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const data = await loginUser({ email: Id, password: Pw }); // email/password 전달
			localStorage.setItem("token", data.accessToken);
			// 로그인 성공 시: 토큰은 localStorage에 저장
			window.dispatchEvent(new Event("auth-changed"));
			if (checked) {
				localStorage.setItem("email", Id);
				localStorage.setItem("password", Pw);
			}
			navigate("/home");
		} catch {
			alert("로그인 실패");
		}
	};

	const handleChecked = (e) => {
		setChecked(e.target.checked);
		localStorage.setItem("autoLogin", e.target.checked);
	};

	useEffect(() => {
		const autoLogin = localStorage.getItem("autoLogin");
		if (autoLogin === "true") {
			setChecked(true);
			setId(localStorage.getItem("email") || "");
			setPw(localStorage.getItem("password") || "");
		}
	}, []);

	return (
		<PageWrapper>
			<img src={certif_logo} alt="Certif logo" width={"200px"} />
			<Blank />
			<LoginMessage>이메일과 비밀번호를</LoginMessage>
			<LoginMessage>입력해주세요.</LoginMessage>
			<Blank />
			<InstText>Email</InstText>
			<InputText
				placeholder="이메일을 입력해 주세요"
				value={Id}
				onChange={(e) => setId(e.target.value)}
			></InputText>
			<Blank />
			<InstText>Password</InstText>
			<InputText
				type="password"
				placeholder="비밀번호를 입력해 주세요"
				value={Pw}
				onChange={(e) => {
					setPw(e.target.value);
				}}
			></InputText>
			<Blank />
			<LoginButton type="submit" disabled={!isEnabled} onClick={handleLogin}>
				로그인
			</LoginButton>
			<Blank />
			<WidthWrapper>
				<LoginCheck type="checkbox" checked={checked} onChange={handleChecked}>
					자동로그인
				</LoginCheck>
			</WidthWrapper>
			<Divide />
			<WidthWrapper>
				<InstText
					onClick={() => {
						setIsOpen(true);
					}}
					style={{ cursor: "pointer" }}
				>
					처음이신가요?
				</InstText>
				<SignButton onClick={handleSignupBtn}>회원가입</SignButton>
				{isOpen && (
					<ModalBackground>
						<ModalBox>
							<CloseButton
								onClick={() => {
									setIsOpen(false);
								}}
							>
								x
							</CloseButton>
							<Blank />

							<Blank />
							<p>안녕하세요.</p>
							<Blank />
							<p>Certif는 자격증을 뜻하는 Certificate와 Surf의 합성어로</p>
							<Blank />
							<p>자격증에 대한 모든 정보를 모아놨습니다.</p>
							<Blank />
							<p>Certif에서 자유롭게 헤엄치세요!🌊🏄</p>
						</ModalBox>
					</ModalBackground>
				)}
			</WidthWrapper>
		</PageWrapper>
	);
}

export default Login;

const ModalBackground = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const ModalBox = styled.div`
	display: flex;
	background: white;
	padding: 20px 30px;
	width: 500px;
	height: 350px;
	border-radius: 12px;
	flex-direction: column;
	box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
`;

const CloseButton = styled(CloseCircleOutlined)`
	color: #aeaeae;
	cursor: pointer;
	align-items: flex-start;
	justify-content: flex-end;
`;
