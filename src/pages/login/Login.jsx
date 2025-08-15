import React from "react";
import { useState } from "react";
import "antd/dist/reset.css";
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

function Login() {
	const [Id, setId] = useState("");
	const [Pw, setPw] = useState("");
	const [checked, setChecked] = useState(false);

	const isEnabled = Id.trim() !== "" && Pw.trim() !== "";

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
			<LoginButton type="submit" disabled={!isEnabled}>
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
				<SignButton>회원가입</SignButton>
			</WidthWrapper>
		</PageWrapper>
	);
}

export default Login;
