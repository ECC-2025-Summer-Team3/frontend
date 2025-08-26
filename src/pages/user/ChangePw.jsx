import React from "react";
import {
	PageWrapper,
	LoginMessage,
	Blank,
	InstText,
	InputText,
	JoinButton,
} from "../../styles/UserStyle.jsx";

function ChangePw() {
	return (
		<PageWrapper style={{ alignItems: "center" }}>
			<LoginMessage style={{ "justify-content": "center" }}>
				비밀번호 변경
			</LoginMessage>{" "}
			<Blank />
			<InstText>현재 비밀번호</InstText>
			<InputText placeholder="현재 비밀번호를 입력해 주세요" />
			<Blank />
			<InstText>새 비밀번호</InstText>
			<InputText placeholder="새 비밀번호를 입력해 주세요" />
			<Blank />
			<InstText>새 비밀번호 확인</InstText>
			<InputText placeholder="새 비밀번호를 입력해 주세요" />
			<Blank /> <Blank />
			<JoinButton>변경하기</JoinButton>
		</PageWrapper>
	);
}

export default ChangePw;
