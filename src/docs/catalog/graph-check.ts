import { className, corner, palette, type CatalogEntry } from '../types.js';

export default {
	slug: 'graph-check',
	title: 'check',
	name: 'GraphCheck',
	category: 'data',
	description:
		'A punch list. Write <Task done label="freeze tokens" />. A note sits under the row. Dated steps are Timeline.',
	importPath: 'mdxcn-svelte/graph-check',
	exports: ['GraphCheck', 'Task'],
	props: [
		{ name: 'title', type: 'string', description: 'Caption drawn on the top edge of the frame.' },
		{
			name: 'items',
			type: 'CheckItem[]',
			description:
				'label, optional done, optional note under the label. Or write <Task /> children.'
		},
		{ name: 'children', type: 'Snippet', description: '<Task /> items.' },
		palette,
		corner,
		className
	],
	items: [
		{
			name: 'Task',
			description: 'One row of the list.',
			props: [
				{ name: 'label', type: 'string', description: 'The task.' },
				{
					name: 'done',
					type: 'boolean',
					default: 'false',
					description: 'Draws [x] in the accent.'
				},
				{ name: 'note', type: 'string', description: 'Muted line under the label.' }
			]
		}
	]
} satisfies CatalogEntry;
