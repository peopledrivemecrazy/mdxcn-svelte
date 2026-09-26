import { className, corner, type CatalogEntry } from '../types.js';

export default {
	slug: 'graph-table',
	title: 'table',
	name: 'GraphTable',
	category: 'data',
	description:
		'A framed table. Write <Head>, <Row> and <Foot> inside the tag. Grouped sections are Sheet. Label/value rows are Spec.',
	importPath: 'mdxcn-svelte/graph-table',
	exports: ['GraphTable', 'Head', 'Row', 'Foot'],
	props: [
		{ name: 'title', type: 'string', description: 'Caption drawn on the top edge of the frame.' },
		{
			name: 'headers',
			type: 'string[] | "Agent | Tokens"',
			description: 'Column headings. Sentence case. Or write <Head />.'
		},
		{
			name: 'rows',
			type: '(string | number)[][] | string[]',
			description: 'Body cells, one array or pipe string per row. Or write <Row /> children.'
		},
		{ name: 'children', type: 'Snippet', description: '<Head />, <Row /> and <Foot /> items.' },
		{
			name: 'footer',
			type: '(string | number)[] | string',
			description: 'Optional totals row under a rule. Or write <Foot />.'
		},
		{
			name: 'align',
			type: '("left" | "right")[] | "left right"',
			default: 'left, then right',
			description: 'Per-column alignment. Defaults to left on the first column.'
		},
		corner,
		className
	],
	items: [
		{
			name: 'Head',
			description: 'Column headings.',
			props: [
				{ name: 'cells', type: 'string | string[]', description: '"Agent | Tokens" or an array.' },
				{
					name: 'align',
					type: '("left" | "right")[] | string',
					description: 'Per-column alignment when the align prop is not set.'
				}
			]
		},
		{
			name: 'Row',
			description: 'One body row.',
			props: [
				{
					name: 'cells',
					type: 'string | (string | number)[]',
					description: '"Inks and paper | 115,207" or an array.'
				}
			]
		},
		{
			name: 'Foot',
			description: 'Totals row under the rule.',
			props: [
				{
					name: 'cells',
					type: 'string | (string | number)[]',
					description: 'Pipe string or an array.'
				}
			]
		}
	]
} satisfies CatalogEntry;
