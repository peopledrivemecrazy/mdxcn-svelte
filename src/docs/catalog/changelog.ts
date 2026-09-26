import { className, corner, palette, type CatalogEntry } from '../types.js';

export default {
	slug: 'changelog',
	title: 'changelog',
	name: 'Changelog',
	category: 'content',
	description:
		'One release. One Change per line: add, change, fix, remove. Numeric deltas are Diff.',
	importPath: 'mdxcn-svelte/changelog',
	exports: ['Changelog', 'Change'],
	props: [
		{
			name: 'version',
			type: 'string',
			description: 'Drawn as the frame title unless title is set.'
		},
		{ name: 'date', type: 'string', description: 'Muted, on the first row.' },
		{
			name: 'title',
			type: 'string',
			description: 'Overrides the frame title; the version moves into the body.'
		},
		{
			name: 'children',
			type: '<Change />',
			description: 'Change items, in order.'
		},
		palette,
		corner,
		className
	],
	items: [
		{
			name: 'Change',
			description: 'One change. Its children are the text.',
			props: [
				{
					name: 'type',
					type: '"add" | "change" | "fix" | "remove"',
					default: '"change"',
					description: 'add is the accent. remove recedes. change and fix stay plain.'
				},
				{ name: 'children', type: 'Snippet', description: 'Markdown. One change.' }
			]
		}
	]
} satisfies CatalogEntry;
