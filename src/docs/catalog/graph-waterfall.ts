import { className, corner, glyphs, palette, type CatalogEntry } from '../types.js';

export default {
	slug: 'graph-waterfall',
	title: 'waterfall',
	name: 'GraphWaterfall',
	category: 'charts',
	description:
		'Running total as floating bars. First row is the start, last is the end, signed values in between.',
	importPath: 'mdxcn-svelte/graph-waterfall',
	exports: ['GraphWaterfall', 'Delta'],
	props: [
		{ name: 'title', type: 'string', description: 'Caption drawn on the top edge of the frame.' },
		{
			name: 'items',
			type: 'WaterfallItem[]',
			description:
				'label, value, optional kind: start, in, out, or end. Kind is inferred if omitted.'
		},
		{
			name: 'children',
			type: 'Snippet',
			description: '<Delta> items, used when items is not set.'
		},
		{ name: 'ticks', type: 'number', default: '24', description: 'Bar width in characters.' },
		glyphs,
		palette,
		corner,
		className
	],
	items: [
		{
			name: 'Delta',
			description: 'One step of the running total.',
			props: [
				{ name: 'label', type: 'string', description: 'Row label.' },
				{
					name: 'value',
					type: 'number | string',
					description: 'Signed amount, e.g. -6 or "12,400".'
				},
				{
					name: 'display',
					type: 'string',
					description: 'Text shown instead of the formatted value.'
				},
				{
					name: 'kind',
					type: '"start" | "in" | "out" | "end"',
					description: 'Override the inferred kind.'
				}
			]
		}
	]
} satisfies CatalogEntry;
