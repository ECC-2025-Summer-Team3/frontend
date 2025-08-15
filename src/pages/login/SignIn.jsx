import React from "react";
import {
	PageWrapper,
	Title,
	Blank,
	UploadButton,
} from "../../styles/LoginStyle.jsx";
import { useState } from "react";
import { Avatar, Upload } from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";

function SignIn() {
	const [profile, setProfile] = useState(null);

	const handleChange = (info) => {
		if (info.file.status === "done" || info.file.status === "uploading") {
			const file = info.file.originFileObj;
			const previewUrl = URL.createObjectURL(file);
			setProfile(previewUrl);
		}
	};

	return (
		<PageWrapper>
			<Title>Certif</Title>
			<Blank />
			<Avatar
				size={80}
				src={profile}
				icon={!profile && <UserOutlined />}
				style={{ backgroundColor: "#f0f0f0" }}
			/>
			<Upload
				showUploadList={false}
				beforeUpload={() => false}
				onChange={handleChange}
			>
				<UploadButton>
					<EditOutlined />
				</UploadButton>
			</Upload>
		</PageWrapper>
	);
}

export default SignIn;
