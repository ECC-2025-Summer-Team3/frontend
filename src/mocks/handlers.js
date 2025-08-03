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

let mockPosts = [
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
let currentPostId = 3;

let mockComments = {
	1: [
		{
			commentId: 1,
			nickname: "닉네임1",
			user_id: 42,
			content: "참여하고 싶어요!",
			createdAt: "2025-07-20T12:00:00",
            avatarUrl: "https://i.pravatar.cc/40?img=1",
		},
		{
			commentId: 2,
			nickname: "닉네임2",
			user_id: 45,
			content: "시간대가 마음에 드네요.",
			createdAt: "2025-07-20T13:15:00",
            avatarUrl: "https://i.pravatar.cc/40?img=2",
		},
	],
};
let currentCommentId = 3;

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

	const newPost = {
		postId: currentPostId++,
		title,
		content,
		category,
		user_id: 42,
		createdAt: new Date().toISOString(),
	};
	mockPosts.push(newPost);
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

    return HttpResponse.json({
      status: "success",
      message: "댓글 등록 성공!",
      data: newComment,
    });
  }
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

		return HttpResponse.json({ status: "success", message: "댓글 삭제 성공!" });
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
];
