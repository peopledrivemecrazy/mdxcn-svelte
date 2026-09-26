import { className, corner, type CatalogEntry } from '../types.js';

export default {
	slug: 'graph-sheet',
	title: 'sheet',
	name: 'GraphSheet',
	category: 'data',
	description:
		'A table with section titles — an API, an RFC. Write a <Section> per group with <Row> children. A flat table is Table.',
	importPath: 'mdxcn-svelte/graph-sheet',
	exports: ['GraphSheet', 'Section', 'Head', 'Row', 'Foot'],
	props: [
		{ name: 'title', type: 'string', description: 'Caption drawn on the top edge of the frame.' },
		{
			name: 'headers',
			type: 'string[] | "Item | Owner | Status"',
			description: 'Column headings. Sentence case. Or write <Head />.'
		},
		{
			name: 'sections',
			type: 'SheetSection[]',
			description: 'Each section has a title and rows of cells. Or write <Section> children.'
		},
		{ name: 'children', type: 'Snippet', description: '<Head />, <Section> and <Foot /> items.' },
		{
			name: 'footer',
			type: '(string | number)[] | string',
			description: 'Optional totals row under a rule. Or write <Foot />.'
		},
		{
			name: 'align',
			type: '("left" | "right")[] | "left left left"',
			default: 'left, then right',
			description: 'Per-column alignment. Defaults to left on the first column.'
		},
		corner,
		className
	],
	items: [
		{
			name: 'Head',
			description: 'Column headings, shared by every section.',
			props: [
				{
					name: 'cells',
					type: 'string | string[]',
					description: '"Item | Owner | Status" or an array.'
				},
				{
					name: 'align',
					type: '("left" | "right")[] | string',
					description: 'Per-column alignment when the align prop is not set.'
				}
			]
		},
		{
			name: 'Section',
			description: 'A titled group of rows. Nest <Row /> inside it.',
			props: [
				{ name: 'title', type: 'string', description: 'Muted heading above the rows.' },
				{
					name: 'rows',
					type: '((string | number)[] | string)[]',
					description: 'Rows as data instead of <Row /> children.'
				}
			]
		},
		{
			name: 'Row',
			description: 'One row inside a <Section>.',
			props: [
				{
					name: 'cells',
					type: 'string | (string | number)[]',
					description: '"CLI copies files | priya | done" or an array.'
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
