import "./App.css";
import React from "react";
import "antd/dist/reset.css";
import Login from "./pages/login/Login.jsx";
import Home from "./pages/Home.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/home" element={<Home />} />
				<Route path="/Login" element={<Login />} />
			</Routes>
		</Router>
	);
}

export default App;
