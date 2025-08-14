import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudyListPage from "./pages/study/StudyListPage";
import StudyWritePage from "./pages/study/StudyWritePage";
import StudyDetailPage from "./pages/study/StudyDetailPage";
import MyPostsPage from "./pages/user/MyPostsPage";
import MyPostEditPage from "./pages/user/MyPostEditPage";
import MyCommentsPage from "./pages/user/MyCommentsPage";

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/study" element={<StudyListPage />} />
        <Route path="/study/write" element={<StudyWritePage />} />
        <Route path="/study/:postId" element={<StudyDetailPage />} />
        <Route path="/user/my-posts" element={<MyPostsPage />} />
        <Route path="/user/my-posts/:postId/edit" element={<MyPostEditPage />} />
        <Route path="/user/my-comments" element={<MyCommentsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
