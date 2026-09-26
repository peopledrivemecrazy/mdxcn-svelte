import { className, corner, glyphs, palette, type CatalogEntry } from '../types.js';

export default {
	slug: 'graph-funnel',
	title: 'funnel',
	name: 'GraphFunnel',
	category: 'charts',
	description:
		'Steps that get narrower as people drop off. Write <Stage value="12,400" label="docs" />. A ranked list is Rank. A process is Flow.',
	importPath: 'mdxcn-svelte/graph-funnel',
	exports: ['GraphFunnel', 'Stage'],
	props: [
		{ name: 'title', type: 'string', description: 'Caption drawn on the top edge of the frame.' },
		{
			name: 'steps',
			type: 'FunnelStep[]',
			description:
				'label, value, and optional display string for the count. Or write <Stage /> children.'
		},
		{ name: 'children', type: 'Snippet', description: '<Stage /> items.' },
		{
			name: 'ticks',
			type: 'number',
			default: '20',
			description: 'Width of the first bar, in characters.'
		},
		{ name: 'stage', type: 'string', description: 'Step label to focus. Other rows recede.' },
		glyphs,
		palette,
		corner,
		className
	],
	items: [
		{
			name: 'Stage',
			description: 'One step of the funnel.',
			props: [
				{ name: 'label', type: 'string', description: 'Step name.' },
				{ name: 'value', type: 'number | string', description: 'Count, e.g. 12400 or "12,400".' },
				{ name: 'display', type: 'string', description: 'Shown instead of the formatted value.' }
			]
		}
	]
} satisfies CatalogEntry;
