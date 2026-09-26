import { className, corner, glyphs, palette, type CatalogEntry } from '../types.js';

export default {
	slug: 'graph-waffle',
	title: 'waffle',
	name: 'GraphWaffle',
	category: 'charts',
	description: 'Grid of 100 cells. The value sets how many are filled in.',
	importPath: 'mdxcn-svelte/graph-waffle',
	exports: ['GraphWaffle'],
	props: [
		{ name: 'title', type: 'string', description: 'Caption drawn on the top edge of the frame.' },
		{ name: 'value', type: 'number | string', description: 'Share from 0 to 1, or "73%".' },
		{ name: 'cells', type: 'number', default: '100', description: 'Total cells in the grid.' },
		{ name: 'columns', type: 'number', default: '10', description: 'Cells per row.' },
		{ name: 'caption', type: 'string', description: 'Muted line under the percent.' },
		glyphs,
		palette,
		corner,
		className
	]
} satisfies CatalogEntry;
