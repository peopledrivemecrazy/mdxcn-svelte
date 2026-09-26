import { className, corner, palette, type CatalogEntry } from '../types.js';

export default {
	slug: 'graph-timeline',
	title: 'timeline',
	name: 'GraphTimeline',
	category: 'diagrams',
	description:
		'A dated list. Write <Event date="Mar 18" label="Docs" />; state="now" marks the current row, state="next" the one after. A punch list is Check. A schedule with start and end is Gantt.',
	importPath: 'mdxcn-svelte/graph-timeline',
	exports: ['GraphTimeline', 'Event'],
	props: [
		{ name: 'title', type: 'string', description: 'Caption drawn on the top edge of the frame.' },
		{
			name: 'events',
			type: 'TimelineEvent[]',
			description:
				'date, label, and optional state: done, now, or next. Or write <Event /> children.'
		},
		{ name: 'children', type: 'Snippet', description: '<Event /> items.' },
		palette,
		corner,
		className
	],
	items: [
		{
			name: 'Event',
			description: 'One dated row.',
			props: [
				{ name: 'date', type: 'string', description: 'Date or time in the second column.' },
				{ name: 'label', type: 'string', description: 'What happened.' },
				{
					name: 'state',
					type: '"done" | "now" | "next"',
					default: '"done"',
					description: 'now takes the accent. next is hollow and muted.'
				}
			]
		}
	]
} satisfies CatalogEntry;
