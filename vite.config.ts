import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	build: {
		sourcemap: true, // Source map generation must be turned on
	},
	plugins: [
		// Put the Sentry vite plugin after all other plugins
		sentryVitePlugin({
			authToken: process.env.SENTRY_AUTH_TOKEN,
			org: process.env.SENTRY_ORG,
			project: process.env.SENTRY_PROJECT,
		}),
		react(),
		tsconfigPaths(),
	],
});
