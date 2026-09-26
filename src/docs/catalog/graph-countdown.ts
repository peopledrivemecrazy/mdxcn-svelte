import { className, corner, palette, type CatalogEntry } from '../types.js';

export default {
	slug: 'graph-countdown',
	title: 'countdown',
	name: 'GraphCountdown',
	category: 'time',
	description: 'Time left until a date. After that it shows a short label you pass in.',
	importPath: 'mdxcn-svelte/graph-countdown',
	exports: ['GraphCountdown'],
	props: [
		{ name: 'title', type: 'string', description: 'Caption drawn on the top edge of the frame.' },
		{
			name: 'to',
			type: 'Date | number | string',
			description: 'The deadline. A date, timestamp, or ISO string.'
		},
		{
			name: 'done',
			type: 'string',
			default: '"done"',
			description: 'What to show after the deadline.'
		},
		{ name: 'caption', type: 'string', description: 'Line under the number.' },
		palette,
		corner,
		className
	]
} satisfies CatalogEntry;
