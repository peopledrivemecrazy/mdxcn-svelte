import { className, corner, type CatalogEntry } from '../types.js';

export default {
	slug: 'steps',
	title: 'steps',
	name: 'Steps',
	category: 'content',
	description:
		'A numbered procedure. One Step per item; state="now" is the current step, state="next" the one after. Dated events are Timeline. A punch list is Check.',
	importPath: 'mdxcn-svelte/steps',
	exports: ['Steps', 'Step'],
	props: [
		{ name: 'title', type: 'string', description: 'Caption drawn on the top edge of the frame.' },
		{
			name: 'children',
			type: '<Step />',
			description: 'Step items, in order. Each step is numbered from 01.'
		},
		corner,
		className
	],
	items: [
		{
			name: 'Step',
			description: 'One step. Its children are the body.',
			props: [
				{ name: 'title', type: 'string', description: 'One line. Drawn next to the number.' },
				{
					name: 'state',
					type: '"done" | "now" | "next"',
					default: '"done"',
					description: 'now uses the accent. next recedes. done stays plain.'
				},
				{ name: 'children', type: 'Snippet', description: 'Markdown. The body of the step.' }
			]
		}
	]
} satisfies CatalogEntry;
