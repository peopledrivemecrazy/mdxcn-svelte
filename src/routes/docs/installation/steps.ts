export const steps = [
	{
		title: 'add the package',
		body: 'Svelte 5 and Tailwind CSS v4 are the only requirements. No motion library: enter animations use the Web Animations API.',
		code: 'bun add mdxcn-svelte\n# or: npm i mdxcn-svelte · pnpm add mdxcn-svelte'
	},
	{
		title: 'import the stylesheet',
		body: 'In the CSS file that imports Tailwind. tokens.css brings the neutral palette, Geist Mono as the mono font, and every accent preset. It also tells Tailwind to scan the package for class names.',
		code: "/* src/app.css */\n@import 'tailwindcss';\n@import 'mdxcn-svelte/tokens.css';"
	},
	{
		title: 'or keep your theme',
		body: 'Already on shadcn-svelte, or any setup that defines --background and --foreground? Import only the graph tokens and utilities.',
		code: "@import 'tailwindcss';\n@import 'mdxcn-svelte/theme.css';"
	},
	{
		title: 'use a graph',
		body: 'Import from the package root or a per-graph path. Every graph takes data props; most also take item children.',
		code: `<script lang="ts">
import { GraphMeter } from 'mdxcn-svelte/graph-meter';
import { GraphTable, Head, Row } from 'mdxcn-svelte/graph-table';
</script>

<GraphMeter title="shipped" value="67%" />

<GraphTable title="usage">
<Head cells="name | requests" />
<Row cells="docs | 12,400" />
<Row cells="api | 900" />
</GraphTable>`
	},
	{
		title: 'dark mode and accents',
		body: 'Dark mode follows a .dark class on <html>, the same as shadcn-svelte and mode-watcher. Pick an accent with data-accent; three-stop families also set data-accent-kind="gradient" so titles use the gradient.',
		code: '<html class="dark" data-accent="mint">\n<html data-accent="aurora" data-accent-kind="gradient">\n\n/* or set your own */\n:root { --graph-accent: oklch(0.6 0.2 30); }'
	},
	{
		title: 'in markdown',
		body: 'With mdsvex, import graphs in a <script> block of any .svx or .md page and write them inline. For plain Markdown without a compiler step, see comark.',
		code: `<script>
import { GraphSpark } from 'mdxcn-svelte/graph-spark';
</script>

Latency held steady all week.

<GraphSpark title="p95 ms" data="12 14 13 18 16 15 14" />`
	}
];
