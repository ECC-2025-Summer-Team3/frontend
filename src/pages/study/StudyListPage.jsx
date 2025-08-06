import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchStudyPosts } from "../../services/StudyService";
import PostPreviewCard from "../../components/community/PostPreviewCard";
import CategoryDropdown from "../../components/community/CategoryDropdown";
import {
	PageWrapper,
	FlexCenter,
	FlexEnd,
	PrimaryButton,
	PostList,
} from "../../styles/CommunityStyle";

const StudyListPage = () => {
	const [posts, setPosts] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState("IT/정보통신");
	const navigate = useNavigate();

	useEffect(() => {
		const loadPosts = async () => {
			try {
				const posts = await fetchStudyPosts();
				setPosts(posts);
			} catch (err) {
				alert("게시글을 불러오지 못했습니다.");
			}
		};
		loadPosts();
	}, []);

	const filteredPosts = posts.filter(
		(post) => post.category === selectedCategory,
	);

	return (
		<PageWrapper $padding="1.5rem">
			<FlexCenter>
				<CategoryDropdown
					selected={selectedCategory}
					onChange={setSelectedCategory}
				/>
			</FlexCenter>

			<FlexEnd>
				<PrimaryButton $small onClick={() => navigate("/study/write")}>
					새 글 작성하기
				</PrimaryButton>
			</FlexEnd>

			<PostList>
				{filteredPosts.map((post) => (
					<PostPreviewCard
						key={post.postId}
						title={post.title}
						content={post.content}
						onClick={() => navigate(`/study/${post.postId}`)}
					/>
				))}
			</PostList>
		</PageWrapper>
	);
};

export default StudyListPage;
