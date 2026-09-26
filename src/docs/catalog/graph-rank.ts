import { className, corner, glyphs, palette, type CatalogEntry } from '../types.js';

export default {
	slug: 'graph-rank',
	title: 'rank',
	name: 'GraphRank',
	category: 'charts',
	description: 'Labels ranked by a number. Two histograms side by side is Bars.',
	importPath: 'mdxcn-svelte/graph-rank',
	exports: ['GraphRank', 'Rank'],
	props: [
		{ name: 'title', type: 'string', description: 'Caption drawn on the top edge of the frame.' },
		{
			name: 'items',
			type: 'RankItem[]',
			description:
				'Each row is a label, a number, and an optional display string for the right column. Or write <Rank /> children.'
		},
		{ name: 'children', type: 'Snippet', description: '<Rank /> items.' },
		{
			name: 'max',
			type: 'number',
			description: 'Scale for the bars. Defaults to the largest value.'
		},
		{
			name: 'ticks',
			type: 'number',
			default: '20',
			description: 'How many character slots each bar uses.'
		},
		glyphs,
		palette,
		corner,
		className
	],
	items: [
		{
			name: 'Rank',
			description: 'One ranked row.',
			props: [
				{ name: 'label', type: 'string', description: 'Row label.' },
				{ name: 'value', type: 'number | string', description: 'The number. "12,400" works.' },
				{
					name: 'display',
					type: 'string',
					description: 'Right column text. Defaults to the formatted value.'
				}
			]
		}
	]
} satisfies CatalogEntry;
