import React from "react";
import "./App.css";
import "antd/dist/reset.css";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import AuthLayout from "./layouts/AuthLayout.jsx";
import StudyListPage from "./pages/study/StudyListPage";
import StudyWritePage from "./pages/study/StudyWritePage";
import StudyDetailPage from "./pages/study/StudyDetailPage";
import ShareListPage from "./pages/share/ShareListPage.jsx";
import ShareWritePage from "./pages/share/ShareWritePage.jsx";
import ShareDetailPage from "./pages/share/ShareDetailPage.jsx";
import MyPostsPage from "./pages/user/MyPostsPage";
import MyPostEditPage from "./pages/user/MyPostEditPage";
import MyCommentsPage from "./pages/user/MyCommentsPage.jsx";
import Login from "./pages/login/Login.jsx";
import Home from "./pages/Home.jsx";
import SignUp from "./pages/login/SignUp.jsx";
import CertifiInfo from "./pages/CertifiInfo.jsx";

function App() {
	return (
		<Router>
			<Routes>
				{/* 기본 라우팅 - 배포 테스트 용 */}
				<Route path="/" element={<Navigate to="/home" replace />} />


				{/* AuthLayout: 헤더 없는 페이지 */}
				<Route element={<AuthLayout />}>
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<SignUp />} />
				</Route>

				{/* MainLayout: 헤더 있는 페이지 */}
				<Route element={<MainLayout />}>
					<Route path="/home" element={<Home />} />
					<Route path="/certifiinfo" element={<CertifiInfo />} />

					{/* Study */}
					<Route path="/study">
						<Route index element={<StudyWritePage />} />
						<Route path="default" element={<StudyListPage />} />
						<Route path="category/:categoryId" element={<StudyListPage />} />
						<Route path=":postId" element={<StudyDetailPage />} />
					</Route>

					{/* Share */}
					<Route path="/share">
						<Route index element={<ShareWritePage />} />
						<Route path="default" element={<ShareListPage />} />
						<Route path="category/:categoryId" element={<ShareListPage />} />
						<Route path="posts/:postId" element={<ShareDetailPage />} />
					</Route>

					{/* User */}
					<Route path="/user/my-posts" element={<MyPostsPage />} />
					<Route
						path="/user/my-posts/:type/:postId"
						element={<MyPostEditPage />}
					/>
					<Route path="/user/my-comments" element={<MyCommentsPage />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
