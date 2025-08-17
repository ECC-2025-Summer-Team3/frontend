import React from "react";
import {
	PageWrapper,
	Title,
	Blank,
	UploadButton,
	ProfileWrapper,
	InstText,
	WidthWrapper,
	InputText,
	OverlapButton,
	JoinButton,
} from "../../styles/LoginStyle.jsx";
import { useState } from "react";
import { Avatar, Upload } from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";

function SignIn() {
	const [img, setImg] = useState(null);

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

	return (
		<PageWrapper>
			<Title>Certif</Title>
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
				<InputText placeholder="닉네임을 입력해주세요" />
				<OverlapButton>중복확인</OverlapButton>
			</WidthWrapper>
			<Blank />
			<InstText>이메일</InstText>
			<WidthWrapper>
				<InputText placeholder="이메일을 입력해주세요" />
				<OverlapButton>중복확인</OverlapButton>
			</WidthWrapper>
			<Blank />
			<InstText>비밀번호</InstText>
			<InputText placeholder="비밀번호를 입력해주세요" />
			<Blank />
			<InstText>비밀번호 확인</InstText>

			<InputText placeholder="비밀번호를 다시 입력해주세요" />
			<Blank />
			<Blank />
			<JoinButton>가입하기</JoinButton>
		</PageWrapper>
	);
}

export default SignIn;
