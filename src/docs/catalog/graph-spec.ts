import { className, corner, type CatalogEntry } from '../types.js';

export default {
	slug: 'graph-spec',
	title: 'spec',
	name: 'GraphSpec',
	category: 'data',
	description:
		'Aligned label and value rows. Write `<Field label="Family" value="Geist Mono" />`. Headline numbers are Stat. A table with headers is Table.',
	importPath: 'mdxcn-svelte/graph-spec',
	exports: ['GraphSpec', 'Field'],
	props: [
		{ name: 'title', type: 'string', description: 'Caption drawn on the top edge of the frame.' },
		{ name: 'rows', type: 'SpecRow[]', description: 'label, value, and optional accent.' },
		{ name: 'children', type: 'Snippet', description: '<Field> items, used when rows is not set.' },
		corner,
		className
	],
	items: [
		{
			name: 'Field',
			description: 'One label and value row.',
			props: [
				{ name: 'label', type: 'string', description: 'Muted left column.' },
				{ name: 'value', type: 'string', description: 'Right column.' },
				{ name: 'accent', type: 'boolean', description: 'Draw the value in the accent color.' }
			]
		}
	]
} satisfies CatalogEntry;
