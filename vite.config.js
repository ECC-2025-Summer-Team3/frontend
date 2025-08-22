import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			"/api": {
				target: "https://3.34.223.76:8080",
				changeOrigin: true,
			},
		},
	},
});
