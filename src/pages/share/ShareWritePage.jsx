import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CategoryDropdown from "../../components/community/CategoryDropdown";
import { createSharePost } from "../../services/ShareService";
import { fetchCategories } from "../../services/CategoryService";
import {
	CommunityBaseStyle,
	PageWrapper,
	FormLabel,
	BaseInput,
	BaseTextarea,
	PrimaryButton,
} from "../../styles/CommunityStyle";

const ShareWritePage = () => {
	const [categories, setCategories] = useState([]);
	const [categoryId, setCategoryId] = useState(null);
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const normalizeCategories = (raw = []) =>
		raw
			.map((c) => ({ id: Number(c.categoryId), categoryName: c.categoryName }))
			.sort((a, b) => a.id - b.id);

	useEffect(() => {
		let alive = true;
		(async () => {
			try {
				const raw = await fetchCategories();
				if (!alive) return;
				const opts = normalizeCategories(raw);
				setCategories(opts);
				if (opts.length > 0) {
					const def = opts.find((c) => c.is_default) || opts[0];
					setCategoryId(def.id);
				} else {
					setCategoryId(null);
				}
			} catch {
				setCategories([]);
				setCategoryId(null);
			}
		})();
		return () => {
			alive = false;
		};
	}, []);

	const handleSubmit = async () => {
		if (!title.trim() || !content.trim()) {
			alert("제목과 내용을 입력해 주세요!");
			return;
		}
		if (categoryId == null) {
			alert("카테고리를 선택해 주세요!");
			return;
		}
		const postData = { title, content, categoryId };

		try {
			setLoading(true);
			await createSharePost(postData);
			alert("글이 등록되었습니다!");
			navigate(`/share/category/${Number(categoryId)}`);
		} catch (error) {
			console.error(error);
			alert(error?.message || "글 등록에 실패했습니다.");
		} finally {
			setLoading(false);
		}
	};
	return (
		<>
			<CommunityBaseStyle />
			<PageWrapper>
				<ContentBox>
					<FormWrapper>
						<FormGroup>
							<FormLabel>카테고리 선택</FormLabel>
							<CategoryDropdown
								options={categories}
								selected={categoryId}
								onChange={(opt) => setCategoryId(opt.id)}
								variant="pink"
							/>
						</FormGroup>

						<FormGroup>
							<FormLabel>제목</FormLabel>
							<BaseInput
								type="text"
								placeholder="제목을 입력해 주세요."
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</FormGroup>

						<FormGroup>
							<FormLabel>내용</FormLabel>
							<BaseTextarea
								placeholder="내용을 입력해 주세요."
								value={content}
								onChange={(e) => setContent(e.target.value)}
							/>
						</FormGroup>
					</FormWrapper>

					<ButtonOutsideWrap>
						<PrimaryButton
							onClick={handleSubmit}
							disabled={loading || categoryId == null}
						>
							{loading ? "등록 중..." : "등록하기"}
						</PrimaryButton>
					</ButtonOutsideWrap>
				</ContentBox>
			</PageWrapper>
		</>
	);
};

export default ShareWritePage;

const ContentBox = styled.div`
	width: 100%;
	max-width: 768px;
`;

const FormWrapper = styled.div`
	background-color: #f3f4f6;
	border-radius: 16px;
	padding: 2rem;
`;

const FormGroup = styled.div`
	margin-bottom: 1.5rem;
`;

const ButtonOutsideWrap = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-top: 1rem;
`;
