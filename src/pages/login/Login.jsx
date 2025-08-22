import React from "react";
import { useState, useEffect } from "react";
import "antd/dist/reset.css";
import { useNavigate } from "react-router-dom";
import {
	PageWrapper,
	Title,
	LoginMessage,
	InstText,
	InputText,
	Blank,
	LoginButton,
	LoginCheck,
	WidthWrapper,
	P1,
	RightLinks,
	Divide,
	SignButton,
} from "../../styles/LoginStyle";
import { loginUser } from "../../services/AuthService";
import { setAuthToken } from "../../utils/http";

function Login() {
	const [Id, setId] = useState("");
	const [Pw, setPw] = useState("");
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
			// 로그인 성공 후 http에 토큰 설정
			setAuthToken(data.accessToken);
			if (checked) {
				localStorage.setItem("email", Id);
				localStorage.setItem("password", Pw);
			}
			navigate("/");
			console.log("로그인 성공", data);
		} catch (err) {
			console.log("로그인 실패:", err);
			alert("로그인 실패");
		}
		console.log(Id, Pw);
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
		console.log(Id, Pw);
	}, []);

	return (
		<PageWrapper>
			<Title>Certif</Title>
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
				<RightLinks>
					<P1>계정 찾기</P1>
					<P1>비밀번호 재설정</P1>
				</RightLinks>
			</WidthWrapper>
			<Divide />
			<WidthWrapper>
				<InstText>처음이신가요?</InstText>
				<SignButton onClick={handleSignupBtn}>회원가입</SignButton>
			</WidthWrapper>
		</PageWrapper>
	);
}

export default Login;
