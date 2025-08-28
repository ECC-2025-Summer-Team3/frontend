import React from "react";
import {
	PageWrapper,
	UploadButton,
	ProfileWrapper,
	NameText,
	MyPageTitle,
	MyPageText,
	Blank,
} from "../../styles/UserStyle.jsx";
import { Avatar, Upload } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import { fetchMyPage, updateProfileImg } from "../../services/UserService.js";

function MyPage() {
	const [img, setImg] = useState(null);
	const [nickname, setNickname] = useState("");
	const [email, setEmail] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ fileList }) => {
		const file = fileList[0]?.originFileObj;
		if (file) {
			const previewUrl = URL.createObjectURL(file);
			setImg(previewUrl);
			updateImg(file);
		}
	};

	useEffect(() => {
		(async () => {
			try {
				const data = await fetchMyPage();
				setEmail(data.email);
				setNickname(data.nickname);
				setImg(data.profileImage);
			} catch (e) {
				console.error(e);
			}
		})();
	}, []);

	const updateImg = async (file) => {
		try {
			const formData = new FormData();
			formData.append("image", file);
			const res = await updateProfileImg(formData);

			if (res.profile_image_url) {
				setImg(res.profile_image_url);
			}
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<PageWrapper>
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
			<NameText>{nickname}</NameText>
			<MyPageTitle>회원정보</MyPageTitle>
			<MyPageText style={{ cursor: "default" }}>
				아이디(이메일): {email}
			</MyPageText>
			<MyPageText
				onClick={() => {
					navigate("/user/changepw");
				}}
			>
				비밀번호 변경
			</MyPageText>
			<Blank />
			<MyPageTitle>활동기록</MyPageTitle>
			<MyPageText
				onClick={() => {
					navigate("/user/my-posts");
				}}
			>
				내가 작성한 글
			</MyPageText>
			<MyPageText
				onClick={() => {
					navigate("/user/my-comments");
				}}
			>
				내가 작성한 댓글
			</MyPageText>
			<Blank />
			<MyPageTitle></MyPageTitle>
			<MyPageText
				onClick={() => {
					navigate("/user/myfavoriteedit");
				}}
			>
				즐겨찾기 수정
			</MyPageText>
		</PageWrapper>
	);
}

export default MyPage;
