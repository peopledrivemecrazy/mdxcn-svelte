import { className, corner, palette, type CatalogEntry } from '../types.js';

export default {
	slug: 'graph-stack',
	title: 'stack',
	name: 'GraphStack',
	category: 'charts',
	description:
		'Parts of a whole on one track. Write <Bar label="marketing" segments="48 js, 22 css, 30 images" />. A share of cells is Waffle.',
	importPath: 'mdxcn-svelte/graph-stack',
	exports: ['GraphStack', 'Bar', 'Segment'],
	props: [
		{ name: 'title', type: 'string', description: 'Caption drawn on the top edge of the frame.' },
		{
			name: 'rows',
			type: 'StackRow[]',
			description: 'Each row has a label and labeled numeric segments. Or write <Bar> children.'
		},
		{ name: 'children', type: 'Snippet', description: '<Bar> items.' },
		{
			name: 'accent',
			type: 'string',
			description: 'Segment label to paint with the accent. Defaults to the first.'
		},
		{ name: 'ticks', type: 'number', default: '24', description: 'Bar width in characters.' },
		{
			name: 'glyphs',
			type: '"shade" | "ascii" | "hash" | "bar" | string[]',
			description: 'One character per segment, or a preset. Defaults to █▓▒░#=+ -.'
		},
		palette,
		corner,
		className
	],
	items: [
		{
			name: 'Bar',
			description: 'One row. Give segments as data or text, or nest <Segment /> children.',
			props: [
				{ name: 'label', type: 'string', description: 'Row label on the left.' },
				{
					name: 'segments',
					type: 'StackSegment[] | string',
					description: 'Labeled values, or "48 js, 22 css, 30 images".'
				},
				{ name: 'children', type: 'Snippet', description: '<Segment /> items.' }
			]
		},
		{
			name: 'Segment',
			description: 'One part of a <Bar>.',
			props: [
				{ name: 'label', type: 'string', description: 'Legend label. Same label, same glyph.' },
				{ name: 'value', type: 'number | string', description: 'Size relative to the row total.' }
			]
		}
	]
} satisfies CatalogEntry;
