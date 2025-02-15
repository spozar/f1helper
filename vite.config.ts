import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
	build: {
		ssr: true, // Enable SSR build
		outDir: "build/server", // AWS Lambda-friendly structure
		rollupOptions: {
			output: {
				format: "esm",
				entryFileNames: "[name].mjs",
			},
		},
	},
});
