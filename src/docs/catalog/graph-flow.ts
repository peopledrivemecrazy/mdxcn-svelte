import { className, corner, palette, type CatalogEntry } from '../types.js';

export default {
	slug: 'graph-flow',
	title: 'flow',
	name: 'GraphFlow',
	category: 'diagrams',
	description:
		"A process on a dashed arrow. One <Path> per row, split on →. Bold the node you're on. A dated list is Timeline. A schedule is Gantt.",
	importPath: 'mdxcn-svelte/graph-flow',
	exports: ['GraphFlow', 'Path'],
	props: [
		{ name: 'title', type: 'string', description: 'Caption drawn on the top edge of the frame.' },
		{
			name: 'rows',
			type: 'FlowRow[]',
			description: 'Each row is a sequence of nodes. Or write <Path /> children.'
		},
		{ name: 'children', type: 'Snippet', description: '<Path /> items.' },
		palette,
		corner,
		className
	],
	items: [
		{
			name: 'Path',
			description: 'One row of the flow.',
			props: [
				{
					name: 'text',
					type: 'string',
					description:
						'"request → **middleware** → handler". Split on → or ->. **bold** is the accent node, *italic* recedes.'
				},
				{ name: 'nodes', type: 'FlowNode[]', description: 'Nodes as data instead of text.' }
			]
		}
	]
} satisfies CatalogEntry;
