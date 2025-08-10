import React from "react";
import { useState } from "react";
import {
	PageWrapper,
	Title,
	LoginMessage,
	LogPass,
	IdInput,
	Blank,
	StyledButton,
} from "../../styles/LoginStyle";

function Login() {
	const [Id, setId] = useState("");
	const [Pw, setPw] = useState("");

	const isEnabled = Id.trim() !== "" && Pw.trim() !== "";

	return (
		<PageWrapper>
			<Title>Certif</Title>
			<Blank />
			<LoginMessage>이메일과 비밀번호를</LoginMessage>
			<LoginMessage>입력해주세요.</LoginMessage>
			<Blank />
			<LogPass>Login</LogPass>
			<IdInput
				placeholder="이메일을 입력해 주세요"
				value={Id}
				onChange={(e) => setId(e.target.value)}
			></IdInput>
			<Blank />
			<LogPass>Password</LogPass>
			<IdInput
				placeholder="비밀번호를 입력해 주세요"
				value={Pw}
				onChange={(e) => setPw(e.target.value)}
			></IdInput>
			<Blank />
			<StyledButton type="submit" disabled={!isEnabled}>
				로그인
			</StyledButton>
		</PageWrapper>
	);
}

export default Login;
