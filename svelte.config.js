import path from 'path';
import sveltePreprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-auto';

const config = {
	kit: {
		adapter: adapter(),
		vite: {
			resolve: {
				alias: {
					$api: path.resolve('./src/routes/api'),
					$utils: path.resolve('./src/utils'),
				},
			},
		},
	},

	preprocess: [sveltePreprocess({ postcss: true })],

	experimental: { prebundleSvelteLibraries: true },
};

export default config;
