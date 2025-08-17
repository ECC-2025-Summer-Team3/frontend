import { http, HttpResponse } from "msw";

const CHECK_AUTH = false;

function isUnauthorized(request) {
	const auth = request.headers.get("authorization");
	return CHECK_AUTH && (!auth || !auth.startsWith("Bearer "));
}

const mockUsers = {
	1: { nickname: "관리자" },
	42: { nickname: "닉네임1" },
	45: { nickname: "닉네임2" },
};

const savedPosts = JSON.parse(localStorage.getItem("mockPosts") || "[]");

let mockPosts = savedPosts.length
	? savedPosts
	: [
			{
				postId: 1,
				title: "자바 스터디 모집합니다!",
				content: "매주 월/수 7시에 진행 예정입니다.",
				category: "IT/정보통신",
				createdAt: "2025-07-20T14:00:00",
				user_id: 42,
			},
			{
				postId: 2,
				title: "네트워크 공부할 사람?",
				content: "네트워크 공부 관심있는 분은 다음 옾챗으로 들어와주세요!",
				category: "IT/정보통신",
				createdAt: "2025-07-19T10:12:00",
				user_id: 56,
			},
		];

let currentPostId =
	(mockPosts.length ? Math.max(...mockPosts.map((p) => p.postId)) : 2) + 1;

function savePosts() {
	localStorage.setItem("mockPosts", JSON.stringify(mockPosts));
}

const savedComments = JSON.parse(localStorage.getItem("mockComments") || "{}");

let mockComments = Object.keys(savedComments).length
	? savedComments
	: {
			1: [
				{
					commentId: 1,
					nickname: "닉네임1",
					user_id: 42,
					content: "참여하고 싶어요!",
					createdAt: "2025-07-20T12:00:00",
					avatarUrl: "",
				},
				{
					commentId: 2,
					nickname: "닉네임2",
					user_id: 45,
					content: "시간대가 마음에 드네요.",
					createdAt: "2025-07-20T13:15:00",
					avatarUrl: "",
				},
			],
		};

let currentCommentId =
	Math.max(
		0,
		...Object.values(mockComments)
			.flat()
			.map((c) => c.commentId ?? 0),
	) + 1;

function saveComments() {
	localStorage.setItem("mockComments", JSON.stringify(mockComments));
}

//글 관련 핸들러

const getAllPosts = http.get("/api/study", ({ request }) => {
	if (isUnauthorized(request)) {
		return HttpResponse.json(
			{ status: "fail", message: "Unauthorized" },
			{ status: 401 },
		);
	}
	return HttpResponse.json({
		status: "success",
		message: "전체 글 조회 성공!",
		data: mockPosts,
	});
});

const getPostById = http.get("/api/study/:postId", ({ params, request }) => {
	if (isUnauthorized(request)) {
		return HttpResponse.json(
			{ status: "fail", message: "Unauthorized" },
			{ status: 401 },
		);
	}
	const id = Number(params.postId);
	const post = mockPosts.find((p) => p.postId === id);
	return post
		? HttpResponse.json({
				status: "success",
				message: "글 상세 조회 성공!",
				data: post,
			})
		: HttpResponse.json(
				{ status: "fail", message: "해당 글을 찾을 수 없습니다." },
				{ status: 404 },
			);
});

const createPost = http.post("/api/study", async ({ request }) => {
	if (isUnauthorized(request)) {
		return HttpResponse.json(
			{ status: "fail", message: "Unauthorized" },
			{ status: 401 },
		);
	}
	const body = await request.json();
	const { title, content, category } = body;
	if (!title || !content || !category) {
		return HttpResponse.json(
			{ status: "fail", message: "필수 항목이 누락되었습니다." },
			{ status: 400 },
		);
	}

	const userId = Number(localStorage.getItem("userId")) || 1;

	const newPost = {
		postId: currentPostId++,
		title,
		content,
		category,
		user_id: userId,
		createdAt: new Date().toISOString(),
	};
	mockPosts.push(newPost);
	savePosts();
	return HttpResponse.json({
		status: "success",
		message: "게시글 등록 성공!",
		data: newPost,
	});
});

const updatePost = http.patch(
	"/api/study/:postId",
	async ({ params, request }) => {
		if (isUnauthorized(request)) {
			return HttpResponse.json(
				{ status: "fail", message: "Unauthorized" },
				{ status: 401 },
			);
		}

		const id = Number(params.postId);
		const { title, content, category } = await request.json();
		if (!title || !content || !category) {
			return HttpResponse.json(
				{ status: "fail", message: "필수 항목이 누락되었습니다." },
				{ status: 400 },
			);
		}

		const index = mockPosts.findIndex((p) => p.postId === id);
		if (index === -1) {
			return HttpResponse.json(
				{ status: "fail", message: "해당 글을 찾을 수 없습니다." },
				{ status: 404 },
			);
		}

		mockPosts[index] = {
			...mockPosts[index],
			title,
			content,
			category,
			updatedAt: new Date().toISOString(),
		};
		savePosts();

		return HttpResponse.json({
			status: "success",
			message: "글 수정 성공!",
			data: mockPosts[index],
		});
	},
);

const deletePost = http.delete("/api/study/:postId", ({ params, request }) => {
	if (isUnauthorized(request)) {
		return HttpResponse.json(
			{ status: "fail", message: "Unauthorized" },
			{ status: 401 },
		);
	}

	const id = Number(params.postId);
	const index = mockPosts.findIndex((p) => p.postId === id);
	if (index === -1) {
		return HttpResponse.json(
			{ status: "fail", message: "해당 글을 찾을 수 없습니다." },
			{ status: 404 },
		);
	}
	mockPosts.splice(index, 1);
	savePosts();
	delete mockComments[id];
	saveComments();
	return HttpResponse.json({ status: "success", message: "글 삭제 성공!" });
});


//댓글 관련 핸들러
const getComments = http.get(
	"/api/study/:postId/comments",
	({ params, request }) => {
		if (isUnauthorized(request)) {
			return HttpResponse.json(
				{ status: "fail", message: "Unauthorized" },
				{ status: 401 },
			);
		}

		const id = Number(params.postId);

		if (!mockComments[id]) {
			mockComments[id] = [];
		}

		return HttpResponse.json({
			status: "success",
			message: "댓글 목록 조회 성공!",
			data: mockComments[id],
		});
	},
);

const createComment = http.post(
	"/api/study/:postId/comments",
	async ({ params, request }) => {
		if (isUnauthorized(request)) {
			return HttpResponse.json(
				{ status: "fail", message: "Unauthorized" },
				{ status: 401 },
			);
		}

		const id = Number(params.postId);
		const body = await request.json();
		const { user_id, content } = body;

		if (!content || !user_id) {
			return HttpResponse.json(
				{ status: "fail", message: "필수 항목이 누락되었습니다." },
				{ status: 400 },
			);
		}

		if (!mockComments[id]) {
			mockComments[id] = [];
		}

		const user = mockUsers[user_id];

		const newComment = {
			commentId: currentCommentId++,
			user_id,
			content,
			createdAt: new Date().toISOString(),
			nickname: user?.nickname ?? `User#${user_id}`,
			profile_image: user?.profile_image ?? "/img/default.png",
		};

		mockComments[id].push(newComment);
		saveComments();

		return HttpResponse.json({
			status: "success",
			message: "댓글 등록 성공!",
			data: newComment,
		});
	},
);

const updateComment = http.patch(
	"/api/study/:postId/comments/:commentId",
	async ({ params, request }) => {
		if (isUnauthorized(request)) {
			return HttpResponse.json(
				{ status: "fail", message: "Unauthorized" },
				{ status: 401 },
			);
		}

		const postId = Number(params.postId);
		const commentId = Number(params.commentId);
		const { content } = await request.json();

		const comments = mockComments[postId];
		if (!comments) {
			return HttpResponse.json(
				{ status: "fail", message: "해당 댓글을 찾을 수 없습니다." },
				{ status: 404 },
			);
		}

		const comment = comments.find((c) => c.commentId === commentId);
		if (!comment) {
			return HttpResponse.json(
				{ status: "fail", message: "해당 댓글을 찾을 수 없습니다." },
				{ status: 404 },
			);
		}

		comment.content = content;
		comment.updatedAt = new Date().toISOString();
		saveComments();

		return HttpResponse.json({
			status: "success",
			message: "댓글 수정 성공!",
			data: comment,
		});
	},
);

const deleteComment = http.delete(
	"/api/study/:postId/comments/:commentId",
	({ params, request }) => {
		if (isUnauthorized(request)) {
			return HttpResponse.json(
				{ status: "fail", message: "Unauthorized" },
				{ status: 401 },
			);
		}

		const postId = Number(params.postId);
		const commentId = Number(params.commentId);

		const comments = mockComments[postId];
		if (!comments) {
			return HttpResponse.json(
				{ status: "fail", message: "해당 댓글을 찾을 수 없습니다." },
				{ status: 404 },
			);
		}

		const index = comments.findIndex((c) => c.commentId === commentId);
		if (index === -1) {
			return HttpResponse.json(
				{ status: "fail", message: "해당 댓글을 찾을 수 없습니다." },
				{ status: 404 },
			);
		}

		comments.splice(index, 1);
		saveComments();

		return HttpResponse.json({ status: "success", message: "댓글 삭제 성공!" });
	},
);

// 내가 쓴 글 조회
const getMyPosts = http.get("/api/user/my-posts", ({ request }) => {
	if (isUnauthorized(request)) {
		return HttpResponse.json(
			{ status: "fail", message: "Unauthorized" },
			{ status: 401 },
		);
	}

	// 테스트용: 로컬에 저장된 userId 사용 (기본값 1)
	const userId = Number(localStorage.getItem("userId")) || 1;

	const myPosts = mockPosts.filter((p) => p.user_id === userId);

	return HttpResponse.json({
		status: "success",
		message: "내가 작성한 글 조회 성공!",
		data: myPosts,
	});
});

// 내가 쓴 글 상세 조회
const getMyPostById = http.get(
	"/api/user/my-posts/:id",
	({ params, request }) => {
		if (isUnauthorized(request)) {
			return HttpResponse.json(
				{ status: "fail", message: "Unauthorized" },
				{ status: 401 },
			);
		}

		const id = Number(params.id);
		const post = mockPosts.find((p) => p.postId === id);
		if (!post) {
			return HttpResponse.json(
				{ status: "fail", message: "해당 글을 찾을 수 없습니다." },
				{ status: 404 },
			);
		}

		return HttpResponse.json({
			status: "success",
			message: "내가 작성한 글 상세 조회 성공!",
			data: post,
		});
	},
);

// 내가 쓴 글 수정
const updateMyPost = http.patch(
	"/api/user/my-posts/:id",
	async ({ params, request }) => {
		if (isUnauthorized(request)) {
			return HttpResponse.json(
				{ status: "fail", message: "Unauthorized" },
				{ status: 401 },
			);
		}

		const id = Number(params.id);
		const { title, content } = await request.json();
		if (!title || !content) {
			return HttpResponse.json(
				{ status: "fail", message: "필수 항목이 누락되었습니다." },
				{ status: 400 },
			);
		}

		const index = mockPosts.findIndex((p) => p.postId === id);
		if (index === -1) {
			return HttpResponse.json(
				{ status: "fail", message: "해당 글을 찾을 수 없습니다." },
				{ status: 404 },
			);
		}

		mockPosts[index] = {
			...mockPosts[index],
			title,
			content,
			updatedAt: new Date().toISOString(),
		};
		savePosts();

		return HttpResponse.json({
			status: "success",
			message: "내가 작성한 글 수정 성공!",
			data: mockPosts[index],
		});
	},
);

// 내가 쓴 댓글 조회
const getMyComments = http.get("/api/user/my-comments", ({ request }) => {
	if (isUnauthorized(request)) {
		return HttpResponse.json(
			{ status: "fail", message: "Unauthorized" },
			{ status: 401 },
		);
	}

	const userId = Number(localStorage.getItem("userId")) || 1;
	const allMyComments = Object.entries(mockComments).flatMap(
		([postId, comments]) => {
			const post = mockPosts.find((p) => p.postId === Number(postId));
			return comments
				.filter((c) => c.user_id === userId)
				.map((c) => ({
					id: c.commentId,
					content: c.content,
					created_at: c.createdAt,
					postId: Number(postId),
					postTitle: post?.title || "",
					categoryPath: post?.category || "",
				}));
		},
	);
	return HttpResponse.json(
		{
			status: "success",
			message: "내가 쓴 댓글 조회 성공!",
			data: allMyComments,
		},
		{ status: 200 },
	);
});

// 내가 쓴 댓글 수정
const patchMyComment = http.patch(
	"/api/user/my-comments/:id",
	async ({ params, request }) => {
		if (isUnauthorized(request)) {
			return HttpResponse.json(
				{ status: "fail", message: "Unauthorized" },
				{ status: 401 },
			);
		}

		const id = Number(params.id);
		const body = await request.json();
		const content = String(body?.content || "").trim();
		if (!content) {
			return HttpResponse.json(
				{ status: "fail", message: "Invalid content" },
				{ status: 400 },
			);
		}

		for (const postId in mockComments) {
			const comment = mockComments[postId].find((c) => c.commentId === id);
			if (comment) {
				comment.content = content;
				saveComments();
				return HttpResponse.json(
					{
						status: "success",
						message: "Comment updated successfully",
						data: comment,
					},
					{ status: 200 },
				);
			}
		}
		return HttpResponse.json(
			{ status: "fail", message: "Comment not found" },
			{ status: 404 },
		);
	},
);

// 내가 쓴 댓글 삭제
const deleteMyComment = http.delete(
	"/api/user/my-comments/:id",
	({ params, request }) => {
		if (isUnauthorized(request)) {
			return HttpResponse.json(
				{ status: "fail", message: "Unauthorized" },
				{ status: 401 },
			);
		}

		const id = Number(params.id);
		for (const postId in mockComments) {
			const idx = mockComments[postId].findIndex((c) => c.commentId === id);
			if (idx !== -1) {
				mockComments[postId].splice(idx, 1);
				saveComments();
				return HttpResponse.json(
					{
						status: "success",
						message: "Comment deleted successfully",
						data: { deletedId: id },
					},
					{ status: 200 },
				);
			}
		}
		return HttpResponse.json(
			{ status: "fail", message: "Comment not found" },
			{ status: 404 },
		);
	},
);

export const handlers = [
	getAllPosts,
	getPostById,
	createPost,
	updatePost,
	deletePost,

	getComments,
	createComment,
	updateComment,
	deleteComment,

	getMyPosts,
	getMyPostById,
	updateMyPost,

	getMyComments,
	patchMyComment,
	deleteMyComment,
];
