import { className, corner, palette, type CatalogEntry } from '../types.js';

export default {
	slug: 'graph-cells',
	title: 'cells',
	name: 'GraphCells',
	category: 'charts',
	description:
		'A small 0/1 grid. Write <Grid label="fragments" cells="1 0 1 0 0 / 0 1 0 1 0" />. A share of a hundred cells is Waffle.',
	importPath: 'mdxcn-svelte/graph-cells',
	exports: ['GraphCells', 'Grid'],
	props: [
		{ name: 'title', type: 'string', description: 'Caption drawn on the top edge of the frame.' },
		{
			name: 'items',
			type: 'CellGrid[]',
			description: 'Each item is a labeled 0/1 matrix. Or write <Grid /> children.'
		},
		{ name: 'children', type: 'Snippet', description: '<Grid /> items.' },
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
			name: 'Grid',
			description: 'One labeled 0/1 matrix.',
			props: [
				{ name: 'label', type: 'string', description: 'Caption under the grid.' },
				{
					name: 'cells',
					type: 'number[][] | string',
					description: 'Rows split on / or newlines: "1 0 1 / 0 1 0".'
				}
			]
		}
	]
} satisfies CatalogEntry;
