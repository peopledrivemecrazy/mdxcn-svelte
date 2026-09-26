import { className, corner, glyphs, palette, type CatalogEntry } from '../types.js';

export default {
	slug: 'graph-plot',
	title: 'plot',
	name: 'GraphPlot',
	category: 'charts',
	description: 'Line or area chart built from columns of block characters.',
	importPath: 'mdxcn-svelte/graph-plot',
	exports: ['GraphPlot'],
	props: [
		{ name: 'title', type: 'string', description: 'Caption drawn on the top edge of the frame.' },
		{
			name: 'data',
			type: 'number[] | string',
			description: 'One value per column, left to right. Or "2 3 4".'
		},
		{
			name: 'labels',
			type: 'string[] | string',
			description: 'First and last labels under the axis.'
		},
		{ name: 'height', type: 'number', default: '7', description: 'Rows in the plot.' },
		{
			name: 'variant',
			type: '"line" | "area"',
			default: '"area"',
			description: 'Area fills down from the cap with ░.'
		},
		{
			name: 'progress',
			type: 'number',
			default: '1',
			description: '0–1. How many columns are revealed.'
		},
		glyphs,
		palette,
		corner,
		className
	]
} satisfies CatalogEntry;
