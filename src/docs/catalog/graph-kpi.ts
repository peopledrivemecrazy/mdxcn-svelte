import { className, corner, palette, type CatalogEntry } from '../types.js';

export default {
	slug: 'graph-kpi',
	title: 'kpi',
	name: 'GraphKpi',
	category: 'data',
	description: 'One large number with a sparkline under it.',
	importPath: 'mdxcn-svelte/graph-kpi',
	exports: ['GraphKpi'],
	props: [
		{ name: 'title', type: 'string', description: 'Caption drawn on the top edge of the frame.' },
		{ name: 'value', type: 'string', description: 'The large number, already formatted.' },
		{ name: 'label', type: 'string', description: 'Line under the number.' },
		{
			name: 'hint',
			type: 'string',
			description: 'Optional extra next to the label, like a delta.'
		},
		{
			name: 'data',
			type: 'number[] | string',
			description: 'Sparkline values, or "4 5 6". Scaled to the highest point.'
		},
		{
			name: 'glyphs',
			type: '"shade" | "ascii" | "hash" | "bar" | string[]',
			description: 'Sparkline characters. Defaults to ▁▂▃▄▅▆▇█.'
		},
		palette,
		corner,
		className
	]
} satisfies CatalogEntry;
