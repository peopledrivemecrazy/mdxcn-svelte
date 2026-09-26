import { className, corner, palette, type CatalogEntry } from '../types.js';

export default {
	slug: 'graph-spark',
	title: 'spark',
	name: 'GraphSpark',
	category: 'charts',
	description: 'Sparkline from block characters. Values scale to the highest point.',
	importPath: 'mdxcn-svelte/graph-spark',
	exports: ['GraphSpark'],
	props: [
		{ name: 'title', type: 'string', description: 'Caption drawn on the top edge of the frame.' },
		{
			name: 'data',
			type: 'number[] | "2 3 4"',
			description: 'Relative values. Scaled to the max.'
		},
		{ name: 'caption', type: 'string', description: 'Muted line under the sparkline.' },
		{
			name: 'glyphs',
			type: '"shade" | "ascii" | "hash" | "bar" | string[]',
			default: '▁▂▃▄▅▆▇█',
			description: 'Defaults to spark bars. Pass shade, ascii, hash, bar, or your own characters.'
		},
		palette,
		corner,
		className
	]
} satisfies CatalogEntry;
