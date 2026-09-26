import { className, corner, type CatalogEntry } from '../types.js';

export default {
	slug: 'callout',
	title: 'callout',
	name: 'Callout',
	category: 'content',
	description:
		'An aside between paragraphs — a caveat, a tip, a warning. The body is Markdown. A quote is Quote.',
	importPath: 'mdxcn-svelte/callout',
	exports: ['Callout'],
	props: [
		{
			name: 'type',
			type: '"note" | "tip" | "warning" | "danger"',
			default: '"note"',
			description: 'Sets the frame title and the glyph in the margin.'
		},
		{
			name: 'title',
			type: 'string',
			description: 'Overrides the frame title. Defaults to the type.'
		},
		{
			name: 'children',
			type: 'Snippet',
			description: 'Markdown. Paragraphs, lists, inline code, links.'
		},
		corner,
		className
	]
} satisfies CatalogEntry;
