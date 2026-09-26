import { className, corner, glyphs, palette, type CatalogEntry } from '../types.js';

export default {
	slug: 'graph-meter',
	title: 'meter',
	name: 'GraphMeter',
	category: 'charts',
	description: 'Progress bar drawn with = characters. Empty slots stay as dashes.',
	importPath: 'mdxcn-svelte/graph-meter',
	exports: ['GraphMeter'],
	props: [
		{ name: 'title', type: 'string', description: 'Caption drawn on the top edge of the frame.' },
		{ name: 'value', type: 'number | string', description: '0 to 1, or "67%".' },
		{ name: 'ticks', type: 'number', default: '14', description: 'Number of character slots.' },
		{ name: 'caption', type: 'string', description: 'Muted line under the meter.' },
		glyphs,
		palette,
		corner,
		className
	]
} satisfies CatalogEntry;
