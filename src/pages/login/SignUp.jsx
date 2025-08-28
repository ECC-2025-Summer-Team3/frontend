import React from "react";
import {
	PageWrapper,
	Blank,
	UploadButton,
	ProfileWrapper,
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
import { Avatar, Upload } from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
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
	const [img, setImg] = useState(null);
	const isEnabled =
		isDuplicated == false &&
		password.trim() != "" &&
		password == password2 &&
		checkEmailForm;

	const navigate = useNavigate();

	const handleSignup = async (e) => {
		e.preventDefault();
		try {
			const data = await registerUser(nickname, email, password);
			console.log("회원가입 성공", data);
			navigate("/login");
		} catch (err) {
			console.log("회원가입 실패:", err.response?.data?.data || err);
			alert(err.response?.data?.message || "회원가입 실패");
		}
		console.log(nickname, email, password);
	};

	const getBase64 = (file, callback) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => callback(reader.result);
	};

	const handleChange = ({ fileList }) => {
		const file = fileList[0]?.originFileObj;
		if (file) {
			getBase64(file, (url) => {
				setImg(url);
			});
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
			<ProfileWrapper>
				<Avatar size={100} icon={!img && <UserOutlined />} src={img} />
				<Upload
					showUploadList={false}
					beforeUpload={() => false} // 서버 업로드 안 하고 로컬 미리보기만
					onChange={handleChange}
				>
					<UploadButton>
						<EditOutlined />
					</UploadButton>
				</Upload>
			</ProfileWrapper>
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
