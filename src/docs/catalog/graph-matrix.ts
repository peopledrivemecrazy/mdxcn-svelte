import { className, corner, palette, type CatalogEntry } from '../types.js';

export default {
	slug: 'graph-matrix',
	title: 'matrix',
	name: 'GraphMatrix',
	category: 'data',
	description:
		'Exact numbers on both axes. Write `<Head>` and `<Row>` children. Intensities are Heatmap. Yes/no features are Compare.',
	importPath: 'mdxcn-svelte/graph-matrix',
	exports: ['GraphMatrix', 'Head', 'Row'],
	props: [
		{ name: 'title', type: 'string', description: 'Caption drawn on the top edge of the frame.' },
		{ name: 'columns', type: 'string[] | string', description: 'Column headings across the top.' },
		{
			name: 'rows',
			type: 'MatrixRow[]',
			description: 'label plus one number or string per column.'
		},
		{ name: 'accent', type: 'string', description: 'Row label to highlight. Other rows recede.' },
		{
			name: 'children',
			type: 'Snippet',
			description: '`<Head>` and `<Row>` items instead of the data props.'
		},
		palette,
		corner,
		className
	],
	items: [
		{
			name: 'Head',
			description: 'Column headings, used when the columns prop is not set.',
			props: [
				{ name: 'cells', type: 'string | string[]', description: '`"Pos | Neg"` or an array.' }
			]
		},
		{
			name: 'Row',
			description: 'One labeled row.',
			props: [
				{ name: 'label', type: 'string', description: 'Row heading on the left.' },
				{
					name: 'cells',
					type: 'string | (string | number)[]',
					description:
						'One value per column: `"41 3"` or `"41 | 3"`. Numbers get thousands separators.'
				}
			]
		}
	]
} satisfies CatalogEntry;
