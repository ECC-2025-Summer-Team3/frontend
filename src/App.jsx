import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudyListPage from "./pages/study/StudyListPage";
import StudyWritePage from "./pages/study/StudyWritePage";
import StudyDetailPage from "./pages/study/StudyDetailPage";

import './App.css';
import 'antd/dist/reset.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/study" element={<StudyListPage />} />
        <Route path="/study/write" element={<StudyWritePage />} />
        <Route path="/study/:postId" element={<StudyDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
