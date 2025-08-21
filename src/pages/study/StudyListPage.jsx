import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	fetchStudyDefault,
	fetchStudyByCategory,
} from "../../services/StudyService";
import { fetchCategories } from "../../services/CategoryService";
import PostPreviewCard from "../../components/community/PostPreviewCard";
import CategoryDropdown from "../../components/community/CategoryDropdown";
import {
	CommunityBaseStyle,
	PageWrapper,
	FlexCenter,
	FlexEnd,
	PrimaryButton,
	PostList,
} from "../../styles/CommunityStyle";

const StudyListPage = () => {
	const { categoryId } = useParams();
	const navigate = useNavigate();

	const [categories, setCategories] = useState([]);
	const [cat, setCat] = useState(null);
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	const toArray = (raw) =>
		Array.isArray(raw) ? raw : Array.isArray(raw?.data) ? raw.data : [];

	const normalizePosts = (arr = []) =>
		arr.map((p) => ({
			id: p.postId,
			title: p.title,
			nickname: p.nickname,
			content: p.content,
			category: p.category,
			createdAt: p.createdAt,
			userId: p.userId,
		}));

	// 카테고리 불러오기
	useEffect(() => {
		(async () => {
			try {
				const raw = await fetchCategories();
				const rawArr = toArray(raw);
				const cats = rawArr
					.map((c) => ({
						id: Number(c.categoryId),
						name: c.categoryName,
					}))
					.sort((a, b) => a.id - b.id);
				setCategories(cats);

				if (cats.length > 0) {
					if (categoryId) {
						const found = cats.find((c) => c.id === Number(categoryId));
						setCat(found || cats[0]);
					} else {
						setCat(cats[0]);
					}
				} else {
					setCat(null);
				}
			} catch (e) {
				console.error("카테고리를 불러오지 못했습니다.", e);
			}
		})();
	}, [categoryId]);

	// 선택된 카테고리가 바뀔 때마다 게시글 불러오기
	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const raw = cat?.id
					? await fetchStudyByCategory(cat.id)
					: await fetchStudyDefault();
				const list = Array.isArray(raw) ? raw : (raw?.data ?? []);
				setPosts(normalizePosts(list));
			} catch (e) {
				console.error("게시글을 불러오지 못했습니다.", e);
				setPosts([]);
			} finally {
				setLoading(false);
			}
		})();
	}, [cat]);

	//State -> URL
	const handleChangeCategory = (nextCat) => {
		setCat(nextCat);
		if (nextCat?.id) {
			navigate(`/study/category/${nextCat.id}`);
		} else {
			navigate(`/study/default`);
		}
	};

	return (
		<>
			<CommunityBaseStyle />
			<PageWrapper $padding="1.5rem">
				<FlexCenter>
					<CategoryDropdown
						options={categories}
						selected={cat}
						onChange={handleChangeCategory}
					/>
				</FlexCenter>

				<FlexEnd>
					<PrimaryButton $small onClick={() => navigate("/study")}>
						새 글 작성하기
					</PrimaryButton>
				</FlexEnd>

				{loading ? (
					<p style={{ textAlign: "center", marginTop: "1rem" }}>
						불러오는 중...
					</p>
				) : posts.length > 0 ? (
					<PostList>
						{posts.map((post) => (
							<PostPreviewCard
								key={post.id}
								title={post.title}
								content={post.content}
								onClick={() => navigate(`/study/${post.id}`)}
							/>
						))}
					</PostList>
				) : null}
			</PageWrapper>
		</>
	);
};

export default StudyListPage;
