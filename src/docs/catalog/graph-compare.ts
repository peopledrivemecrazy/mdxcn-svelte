import { className, corner, palette, type CatalogEntry } from '../types.js';

export default {
	slug: 'graph-compare',
	title: 'compare',
	name: 'GraphCompare',
	category: 'data',
	description:
		'Two options side by side. Write `<Col>` and `<Row>` children; `yes`/`no` become ✓ and –. Exact numbers on both axes are Matrix.',
	importPath: 'mdxcn-svelte/graph-compare',
	exports: ['GraphCompare', 'Col', 'Head', 'Row'],
	props: [
		{ name: 'title', type: 'string', description: 'Caption drawn on the top edge of the frame.' },
		{ name: 'columns', type: 'string[] | string', description: 'Option names across the top.' },
		{
			name: 'rows',
			type: 'CompareRow[]',
			description: 'label plus one value per column. Booleans become ✓ or –.'
		},
		{
			name: 'accent',
			type: 'string',
			description: 'Column name to highlight. Other columns recede.'
		},
		{
			name: 'children',
			type: 'Snippet',
			description: '`<Col>` or `<Head>` for columns and `<Row>` items instead of the data props.'
		},
		palette,
		corner,
		className
	],
	items: [
		{
			name: 'Col',
			description: 'One option across the top.',
			props: [{ name: 'label', type: 'string', description: 'Option name.' }]
		},
		{
			name: 'Head',
			description: 'All column names at once, instead of `<Col>` items.',
			props: [
				{ name: 'cells', type: 'string | string[]', description: '`"Solo | Studio"` or an array.' }
			]
		},
		{
			name: 'Row',
			description: 'One feature row.',
			props: [
				{ name: 'label', type: 'string', description: 'Feature name on the left.' },
				{
					name: 'cells',
					type: 'string | (string | number)[]',
					description:
						'One value per column: `"yes no"` or `"$0 | $24"`. yes/true/✓ and no/false/– become marks.'
				}
			]
		}
	]
} satisfies CatalogEntry;
