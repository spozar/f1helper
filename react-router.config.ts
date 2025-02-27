import type { Config } from "@react-router/dev/config";
import { vercelPreset } from "@vercel/react-router/vite";

export default {
	presets: [vercelPreset()],
	ssr: true,
	future: {
		unstable_splitRouteModules: true,
		unstable_optimizeDeps: true,
	},
} satisfies Config;
