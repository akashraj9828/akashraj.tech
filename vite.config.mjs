import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
	// Keep this app's generated files isolated from the other projects sharing
	// the domain document root. Root SPA routes are rewritten to this build by
	// the document-root .htaccess rules.
	base: "/portfolio/",
	plugins: [react({ include: /\.[jt]sx?$/ })],
	resolve: {
		alias: {
			assets: fileURLToPath(new URL("./src/assets", import.meta.url)),
			components: fileURLToPath(new URL("./src/components", import.meta.url)),
			config: fileURLToPath(new URL("./src/config", import.meta.url)),
			data: fileURLToPath(new URL("./src/data", import.meta.url)),
			logic: fileURLToPath(new URL("./src/logic", import.meta.url)),
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				// Theme styles intentionally use nested imports to inject the dark/light variables.
				silenceDeprecations: ["import"],
			},
		},
	},
	build: {
		outDir: "build",
		sourcemap: true,
		// Bootstrap Material Design 4 contains legacy selectors rejected by
		// Lightning CSS, so preserve its already-minified vendor CSS.
		cssMinify: false,
	},
	test: {
		environment: "jsdom",
		globals: true,
		setupFiles: "./src/testSetup.js",
	},
});
