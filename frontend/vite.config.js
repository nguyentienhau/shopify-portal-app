import { dirname } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

process.env.VITE_SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY;
if (process.env.npm_lifecycle_event === "build" && !process.env.CI && !process.env.SHOPIFY_API_KEY) {
	throw new Error(
		"\n\nThe frontend build will not work without an API key. Set the SHOPIFY_API_KEY environment variable when running the build command, for example:" +
			"\n\nSHOPIFY_API_KEY=<your-api-key> npm run build\n"
	);
}

const proxyOptions = {
	target: `http://127.0.0.1:${process.env.BACKEND_PORT}`,
	changeOrigin: false,
	secure: true,
	ws: false
};

let hmrConfig = {};

if (process.env.HOST) {
	hmrConfig = {
		protocol: "wss",
		host: process.env.HOST.replace(/https?:\/\//, ""),
		port: process.env.FRONTEND_PORT,
		clientPort: 443
	};
} else {
	hmrConfig = {
		protocol: "ws",
		host: "localhost",
		port: 64999,
		clientPort: 64999
	};
}

export default defineConfig({
	root: dirname(fileURLToPath(import.meta.url)),
	plugins: [react()],
	resolve: {
		preserveSymlinks: true,
		alias: {
			"@": __dirname
		}
	},
	define: {
		API_URL: JSON.stringify((process.env.HOST || "https://localhost:" + process.env.BACKEND_PORT) + "/api"),
		WIKI_LINK: JSON.stringify("")
	},
	server: {
		host: "localhost",
		port: process.env.FRONTEND_PORT,
		hmr: hmrConfig,
		proxy: {
			"^/(\\?.*)?$": proxyOptions,
			"^/api(/|(\\?.*)?$)": proxyOptions
		}
	}
});
