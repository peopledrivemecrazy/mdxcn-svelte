import { className, corner, type CatalogEntry } from '../types.js';

export default {
	slug: 'graph-stat',
	title: 'stat',
	name: 'GraphStat',
	category: 'data',
	description:
		'Two to four large numbers. Write `<Stat value="12,400" label="docs" />`; accent the one that matters. One number with a trend is KPI.',
	importPath: 'mdxcn-svelte/graph-stat',
	exports: ['GraphStat', 'Stat'],
	props: [
		{ name: 'title', type: 'string', description: 'Caption drawn on the top edge of the frame.' },
		{
			name: 'items',
			type: 'StatItem[]',
			description: 'value, label, optional hint, optional accent.'
		},
		{ name: 'children', type: 'Snippet', description: '<Stat> items, used when items is not set.' },
		corner,
		className
	],
	items: [
		{
			name: 'Stat',
			description: 'One large number.',
			props: [
				{ name: 'value', type: 'string | number', description: 'The number, drawn large.' },
				{ name: 'label', type: 'string', description: 'Muted line under the number.' },
				{ name: 'hint', type: 'string', description: 'Second muted line, e.g. a delta.' },
				{ name: 'accent', type: 'boolean', description: 'Draw the number in the accent color.' }
			]
		}
	]
} satisfies CatalogEntry;
