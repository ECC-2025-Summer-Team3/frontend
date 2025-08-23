import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
		strictPort: true,
		proxy: {
			"/api": {
				target: "http://3.34.223.76:8080",
				changeOrigin: true,
			},
		},

	},
});
