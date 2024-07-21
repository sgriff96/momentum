import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/adapter-cloudflare).Config} */
const config = {
	preprocess: vitePreprocess(),
	onwarn: (warning, handler) => {
		if (warning.filename.includes('node_modules')) return;
		handler(warning);
	},
	kit: {
		adapter: adapter(),
	},
};

export default config;
