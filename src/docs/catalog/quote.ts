import { className, corner, type CatalogEntry } from '../types.js';

export default {
	slug: 'quote',
	title: 'quote',
	name: 'Quote',
	category: 'content',
	description: "Someone else's sentence, with a name under it. Your own caveat is Callout.",
	importPath: 'mdxcn-svelte/quote',
	exports: ['Quote'],
	props: [
		{ name: 'by', type: 'string', description: 'Who said it. Drawn after an em dash.' },
		{ name: 'source', type: 'string', description: 'Where. Muted, after the name.' },
		{ name: 'title', type: 'string', description: 'Optional frame title. Off by default.' },
		{ name: 'children', type: 'Snippet', description: 'Markdown. The quote itself.' },
		corner,
		className
	]
} satisfies CatalogEntry;
