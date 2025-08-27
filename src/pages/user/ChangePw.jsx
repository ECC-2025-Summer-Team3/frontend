import React from "react";
import {
	PageWrapper,
	LoginMessage,
	Blank,
	InstText,
	InputText,
	JoinButton,
	RedMsg,
} from "../../styles/UserStyle.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../services/UserService.js";

function ChangePw() {
	const [pw, setPw] = useState("");
	const [newPw, setNewPw] = useState("");
	const [newPw2, setNewPw2] = useState("");
	const isEnabled = newPw.trim() != "" && newPw === newPw2 && pw.trim() != "";
	const navigate = useNavigate();

	const resetPw = async (newPw) => {
		try {
			const data = await resetPassword(newPw);
			console.log(data);
			navigate("/user/mypage");
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<PageWrapper style={{ alignItems: "center" }}>
			<LoginMessage style={{ "justify-content": "center" }}>
				비밀번호 변경
			</LoginMessage>{" "}
			<Blank />
			<InstText>현재 비밀번호</InstText>
			<InputText
				placeholder="현재 비밀번호를 입력해 주세요"
				value={pw}
				onChange={(e) => setPw(e.target.value)}
			/>
			<Blank />
			<InstText>새 비밀번호</InstText>
			<InputText
				placeholder="새 비밀번호를 입력해 주세요"
				value={newPw}
				onChange={(e) => setNewPw(e.target.value)}
			/>
			<Blank />
			<InstText>새 비밀번호 확인</InstText>
			<InputText
				placeholder="새 비밀번호를 입력해 주세요"
				value={newPw2}
				onChange={(e) => setNewPw2(e.target.value)}
			/>
			{newPw != newPw2 && <RedMsg>비밀번호가 다릅니다.</RedMsg>}
			<Blank /> <Blank />
			<JoinButton
				disabled={!isEnabled}
				onClick={() => {
					resetPw(newPw);
				}}
			>
				변경하기
			</JoinButton>
		</PageWrapper>
	);
}

export default ChangePw;
