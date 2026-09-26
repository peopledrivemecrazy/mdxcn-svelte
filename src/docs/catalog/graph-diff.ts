import { className, corner, palette, type CatalogEntry } from '../types.js';

export default {
	slug: 'graph-diff',
	title: 'diff',
	name: 'GraphDiff',
	category: 'data',
	description:
		'What was added, removed, or kept. Write `<Line sign="add" label="app" value="31 kb" />`. Mark the total. Numeric before/after is Slope.',
	importPath: 'mdxcn-svelte/graph-diff',
	exports: ['GraphDiff', 'Line'],
	props: [
		{ name: 'title', type: 'string', description: 'Caption drawn on the top edge of the frame.' },
		{
			name: 'rows',
			type: 'DiffRow[]',
			description: 'label, value, and optional sign: add, remove, or keep.'
		},
		{ name: 'footer', type: 'DiffRow', description: 'Total row under a rule.' },
		{
			name: 'children',
			type: 'Snippet',
			description: '`<Line>` items instead of rows and footer.'
		},
		palette,
		corner,
		className
	],
	items: [
		{
			name: 'Line',
			description: 'One row. `total` draws it under the rule as the footer.',
			props: [
				{ name: 'label', type: 'string', description: 'What changed.' },
				{ name: 'value', type: 'string', description: 'Amount, printed right-aligned.' },
				{
					name: 'sign',
					type: '"add" | "remove" | "keep"',
					default: '"keep"',
					description: 'Draws +, -, or nothing in the gutter and sets the tone.'
				},
				{ name: 'total', type: 'boolean', default: 'false', description: 'Use as the footer row.' }
			]
		}
	]
} satisfies CatalogEntry;
