import { className, corner, palette, type CatalogEntry } from '../types.js';

export default {
	slug: 'graph-bars',
	title: 'bars',
	name: 'GraphBars',
	category: 'charts',
	description:
		'Two small histograms, before and after. Write <Series label="before" values="2 4 3 5 2" />. A ranked list is Rank.',
	importPath: 'mdxcn-svelte/graph-bars',
	exports: ['GraphBars', 'Series'],
	props: [
		{ name: 'title', type: 'string', description: 'Caption drawn on the top edge of the frame.' },
		{
			name: 'from',
			type: 'BarSeries',
			description: 'Left series. values is an array of relative heights. Or the first <Series />.'
		},
		{
			name: 'to',
			type: 'BarSeries',
			description: 'Right series. Set size to lg for the larger group. Or the second <Series />.'
		},
		{ name: 'children', type: 'Snippet', description: 'Two <Series /> items.' },
		{ name: 'processor', type: 'string', description: 'Optional label between the two groups.' },
		{
			name: 'glyphs',
			type: '"shade" | "ascii" | "hash" | "bar" | string[]',
			default: '"shade"',
			description:
				'Character set. shade is ·░▒▓█. ascii is .- =#@. Pass a preset or your own characters.'
		},
		palette,
		corner,
		className
	],
	items: [
		{
			name: 'Series',
			description: 'One group of bars. The first is from, the second is to.',
			props: [
				{ name: 'label', type: 'string', description: 'Caption under the bars.' },
				{ name: 'values', type: 'number[] | "2 4 3 5 2"', description: 'Relative heights.' },
				{ name: 'size', type: '"sm" | "lg"', default: '"sm"', description: 'lg draws taller bars.' }
			]
		}
	]
} satisfies CatalogEntry;
