import { className, corner, glyphs, palette, type CatalogEntry } from '../types.js';

export default {
	slug: 'graph-bullet',
	title: 'bullet',
	name: 'GraphBullet',
	category: 'charts',
	description: 'Actual versus target on a shared track. The marker is the target.',
	importPath: 'mdxcn-svelte/graph-bullet',
	exports: ['GraphBullet', 'Target'],
	props: [
		{ name: 'title', type: 'string', description: 'Caption drawn on the top edge of the frame.' },
		{
			name: 'items',
			type: 'BulletItem[]',
			description: 'label, value, optional target, max, and display. Or write <Target /> children.'
		},
		{ name: 'children', type: 'Snippet', description: '<Target /> items.' },
		{
			name: 'ticks',
			type: 'number',
			default: '20',
			description: 'Track width in characters, not counting the brackets.'
		},
		glyphs,
		palette,
		corner,
		className
	],
	items: [
		{
			name: 'Target',
			description: 'One row: actual value against a target marker.',
			props: [
				{ name: 'label', type: 'string', description: 'Row label.' },
				{ name: 'value', type: 'number | string', description: 'Actual value.' },
				{ name: 'target', type: 'number | string', description: 'Where the | marker sits.' },
				{
					name: 'max',
					type: 'number | string',
					description: 'Scale. Defaults to the larger of value and target.'
				},
				{
					name: 'display',
					type: 'string',
					description: 'Right column text. Defaults to "value / target".'
				}
			]
		}
	]
} satisfies CatalogEntry;
