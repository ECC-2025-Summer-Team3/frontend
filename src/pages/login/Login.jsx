import React from "react";
import { useState } from "react";
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
import axios from "axios";

function Login() {
	const [Id, setId] = useState("");
	const [Pw, setPw] = useState("");
	const [msg, setMsg] = useState("");
	const [checked, setChecked] = useState(false);

	const isEnabled = Id.trim() !== "" && Pw.trim() !== "";

	const navigate = useNavigate();
	const handleLogin = () => {
		navigate("/signup");
	};

	const login = async () => {
		try {
			const response = await axios.post(
				"http://localhost:8080/api/auth/login",
				{
					Id,
					Pw,
				},
			);

			if (response.data.status === "success") {
				localStorage.setItem("accessToken", response.data.accessToken);
				localStorage.setItem("refreshToken", response.data.refreshToken);

				setMsg("로그인 성공!");
			}
		} catch (error) {
			if (error.response) {
				setMsg(error.response.data.message);
			} else {
				setMsg("서버 연결 오류");
			}
		}
	};
	
	return (
		<PageWrapper>
			<Title>Certif</Title>
			<Blank />
			<LoginMessage>이메일과 비밀번호를</LoginMessage>
			<LoginMessage>입력해주세요.</LoginMessage>
			<Blank />
			<InstText>Login</InstText>
			<InputText
				placeholder="이메일을 입력해 주세요"
				value={Id}
				onChange={(e) => setId(e.target.value)}
			></InputText>
			<Blank />
			<InstText>Password</InstText>
			<InputText
				placeholder="비밀번호를 입력해 주세요"
				value={Pw}
				onChange={(e) => setPw(e.target.value)}
			></InputText>
			<Blank />
			<LoginButton type="submit" disabled={!isEnabled} onClick={login}>
				로그인
			</LoginButton>
			<Blank />
			<WidthWrapper>
				<LoginCheck
					type="checkbox"
					checked={checked}
					onChange={(e) => setChecked(e.target.checked)}
				>
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
				<SignButton onClick={handleLogin}>회원가입</SignButton>
			</WidthWrapper>
		</PageWrapper>
	);
}

export default Login;
