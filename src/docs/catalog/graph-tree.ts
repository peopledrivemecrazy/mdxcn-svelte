import { className, corner, type CatalogEntry } from '../types.js';

export default {
	slug: 'graph-tree',
	title: 'tree',
	name: 'GraphTree',
	category: 'diagrams',
	description:
		'Nested nodes drawn with branch glyphs. Accent a node to highlight it — files, an org chart. Not a timeline or a table.',
	importPath: 'mdxcn-svelte/graph-tree',
	exports: ['GraphTree', 'Node'],
	props: [
		{ name: 'title', type: 'string', description: 'Caption drawn on the top edge of the frame.' },
		{
			name: 'nodes',
			type: 'TreeNode[]',
			description:
				'Nested nodes. Each may have label, meta, accent, and children. Or nest <Node> children.'
		},
		{ name: 'children', type: 'Snippet', description: 'Nested <Node> items.' },
		corner,
		className
	],
	items: [
		{
			name: 'Node',
			description: 'One tree node. Nest <Node> inside it for children.',
			props: [
				{ name: 'label', type: 'string', description: 'Node name.' },
				{ name: 'meta', type: 'string', description: 'Muted text on the right.' },
				{
					name: 'accent',
					type: 'boolean',
					default: 'false',
					description: 'Highlight this node; the others recede.'
				}
			]
		}
	]
} satisfies CatalogEntry;
