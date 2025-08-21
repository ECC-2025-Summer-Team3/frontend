import React from "react";
import "./App.css";
import "antd/dist/reset.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudyListPage from "./pages/study/StudyListPage";
import StudyWritePage from "./pages/study/StudyWritePage";
import StudyDetailPage from "./pages/study/StudyDetailPage";
import MyPostsPage from "./pages/user/MyPostsPage";
import MyPostEditPage from "./pages/user/MyPostEditPage";
import Login from "./pages/login/Login.jsx";
import Home from "./pages/Home.jsx";
import SignUp from "./pages/login/SignUp.jsx";
import CertifiInfo from "./pages/CertifiInfo.jsx";
import Header from "./components/Header.jsx";

function App() {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/certifiinfo" element={<CertifiInfo />} />
				{/* Study */}
				<Route path="/study">
					<Route index element={<StudyWritePage />} />
					<Route path="default" element={<StudyListPage />} />
					<Route path="category/:categoryId" element={<StudyListPage />} />
					<Route path=":postId" element={<StudyDetailPage />} />
				</Route>
				{/* User */}
				<Route path="/user/my-posts" element={<MyPostsPage />} />
				<Route
					path="/user/my-posts/:type/:postId"
					element={<MyPostEditPage />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
