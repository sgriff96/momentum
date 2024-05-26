import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/adapter-cloudflare).Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter()
	}
};

export default config;
