if (import.meta.env.DEV) {
	const { worker } = await import("./utils/browser");
	await worker.start();
}

import { StrictMode } from "react";
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "antd/dist/reset.css";
import App from "./App";

async function enableMocks() {
	if (import.meta.env.DEV || import.meta.env.VITE_ENABLE_MSW === "true") {
		const { worker } = await import("./mocks/browser");
		await worker.start({
			serviceWorker: { url: "/mockServiceWorker.js" },
			onUnhandledRequest: "bypass",
		});
	}
}

enableMocks().then(() => {
	createRoot(document.getElementById("root")).render(
		<StrictMode>
			<App />
		</StrictMode>,
	);
});
