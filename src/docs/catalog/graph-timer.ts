import { className, corner, palette, type CatalogEntry } from '../types.js';

export default {
	slug: 'graph-timer',
	title: 'timer',
	name: 'GraphTimer',
	category: 'time',
	description: 'Elapsed time, how long ago, or the time of day. The numbers update every second.',
	importPath: 'mdxcn-svelte/graph-timer',
	exports: ['GraphTimer'],
	props: [
		{ name: 'title', type: 'string', description: 'Caption drawn on the top edge of the frame.' },
		{
			name: 'kind',
			type: '"elapsed" | "ago" | "clock"',
			default: '"elapsed"',
			description: 'elapsed counts up from at. ago is relative. clock is the time of day.'
		},
		{
			name: 'at',
			type: 'Date | number | string',
			description: 'Start time for elapsed and ago. A date, timestamp, or ISO string.'
		},
		{ name: 'caption', type: 'string', description: 'Line under the number.' },
		palette,
		corner,
		className
	]
} satisfies CatalogEntry;
