import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import styled from "styled-components";

export default function MainLayout() {
	return (
		<Shell>
			<Header />
			<Main id="page-root">
				<Outlet />
			</Main>
		</Shell>
	);
}

const Shell = styled.div`
	min-height: 100vh;
	display: flex;
	flex-direction: column;
`;
const Main = styled.main`
	flex: 1;
`;
