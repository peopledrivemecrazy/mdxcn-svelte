import { className, corner, palette, type CatalogEntry } from '../types.js';

export default {
	slug: 'graph-slope',
	title: 'slope',
	name: 'GraphSlope',
	category: 'charts',
	description: 'Two figures per row with an arrow between. Up uses the accent, down recedes.',
	importPath: 'mdxcn-svelte/graph-slope',
	exports: ['GraphSlope', 'Slope'],
	props: [
		{ name: 'title', type: 'string', description: 'Caption drawn on the top edge of the frame.' },
		{ name: 'fromLabel', type: 'string', description: 'Header over the first column.' },
		{ name: 'toLabel', type: 'string', description: 'Header over the second column.' },
		{
			name: 'items',
			type: 'SlopeItem[]',
			description: 'label, from, and to. Or write <Slope /> children.'
		},
		{ name: 'children', type: 'Snippet', description: '<Slope /> items.' },
		palette,
		corner,
		className
	],
	items: [
		{
			name: 'Slope',
			description: 'One row: a label and the figure before and after.',
			props: [
				{ name: 'label', type: 'string', description: 'Row label.' },
				{ name: 'from', type: 'number | string', description: 'First figure. "8,200" works.' },
				{ name: 'to', type: 'number | string', description: 'Second figure.' }
			]
		}
	]
} satisfies CatalogEntry;
