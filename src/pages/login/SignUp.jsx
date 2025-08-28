import React from "react";
import {
	PageWrapper,
	Blank,
	InstText,
	WidthWrapper,
	InputText,
	OverlapButton,
	JoinButton,
	RedMsg,
	GreenMsg,
} from "../../styles/UserStyle.jsx";
import certif_logo from "../../assets/certif_logo.png";
import { useState } from "react";
import {
	registerUser,
	checkNickname,
	checkEmail,
} from "../../services/AuthService";
import { useNavigate } from "react-router-dom";

function SignUp() {
	const [nickname, setNickname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const [isDuplicated, setIsDuplicated] = useState(null);
	const [isDuplicated2, setIsDuplicated2] = useState(null);
	const [isClicked, setIsClicked] = useState(false);
	const [isClicked2, setIsClicked2] = useState(false);
	const [checkEmailForm, setCheckEmailForm] = useState(null);
	const isEnabled =
		isDuplicated == false &&
		password.trim() != "" &&
		password == password2 &&
		checkEmailForm;

	const navigate = useNavigate();

	const handleSignup = async (e) => {
		e.preventDefault();
		try {
			await registerUser(nickname, email, password);
			navigate("/login");
		} catch (err) {
			console.log("회원가입 실패:", err.response?.data?.data || err);
			alert(err.response?.data?.message || "회원가입 실패");
		}
	};

	const handleNickname = async (nickname) => {
		try {
			const data = await checkNickname(nickname);
			setIsDuplicated(data.isDuplicate);
		} catch (e) {
			console.error(e);
		}
	};

	const handleEmail = async (email) => {
		try {
			const data = await checkEmail(email);
			setIsDuplicated2(data.isDuplicate);
			console.log(data);
		} catch (e) {
			console.error(e.response?.data || e.message);
		}
	};

	return (
		<PageWrapper>
			<img src={certif_logo} alt="Certif logo" width={"200px"} />
			<Blank />

			<Blank />
			<InstText>닉네임</InstText>
			<WidthWrapper>
				<InputText
					placeholder="닉네임을 입력해주세요"
					value={nickname}
					onChange={(e) => setNickname(e.target.value)}
				/>
				<OverlapButton
					onClick={() => {
						handleNickname(nickname);
						setIsClicked(true);
					}}
					disabled={nickname == ""}
				>
					중복확인
				</OverlapButton>
			</WidthWrapper>
			{isClicked &&
				(isDuplicated ? (
					<RedMsg>이미 사용중인 닉네임입니다.</RedMsg>
				) : (
					<GreenMsg>사용 가능한 닉네임입니다.</GreenMsg>
				))}
			<Blank />
			<InstText>이메일</InstText>
			<WidthWrapper>
				<InputText
					placeholder="이메일을 입력해주세요"
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
						setCheckEmailForm(
							/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value),
						);
					}}
				/>
				<OverlapButton
					onClick={() => {
						handleEmail(email);
						setIsClicked2(true);
					}}
					disabled={email == ""}
				>
					중복확인
				</OverlapButton>
			</WidthWrapper>
			{checkEmailForm === false && <RedMsg>잘못된 이메일 형식입니다.</RedMsg>}
			{isClicked2 &&
				(isDuplicated2 ? (
					<RedMsg>이미 사용중인 이메일입니다.</RedMsg>
				) : (
					isDuplicated2(<GreenMsg>사용 가능한 이메일입니다.</GreenMsg>)
				))}
			<Blank />
			<InstText>비밀번호</InstText>
			<InputText
				type="password"
				placeholder="비밀번호를 입력해주세요"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<Blank />
			<InstText>비밀번호 확인</InstText>

			<InputText
				type="password"
				placeholder="비밀번호를 다시 입력해주세요"
				value={password2}
				onChange={(e) => setPassword2(e.target.value)}
			/>
			{password != password2 && <RedMsg>비밀번호가 다릅니다.</RedMsg>}
			<Blank />
			<Blank />
			<JoinButton onClick={handleSignup} disabled={!isEnabled}>
				가입하기
			</JoinButton>
		</PageWrapper>
	);
}

export default SignUp;
