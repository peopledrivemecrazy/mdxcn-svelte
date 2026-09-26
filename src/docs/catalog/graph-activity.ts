import { className, corner, glyphs, palette, type CatalogEntry } from '../types.js';

export default {
	slug: 'graph-activity',
	title: 'activity',
	name: 'GraphActivity',
	category: 'charts',
	description:
		'GitHub-style contribution grid. Pass dated counts; weeks, months, and intensity are derived.',
	importPath: 'mdxcn-svelte/graph-activity',
	exports: ['GraphActivity'],
	props: [
		{ name: 'title', type: 'string', description: 'Caption drawn on the top edge of the frame.' },
		{
			name: 'days',
			type: 'ActivityDay[]',
			description: 'ISO date plus count. Gaps fill as empty days.'
		},
		{
			name: 'weekStartsOn',
			type: '0 | 1',
			default: '0',
			description: '0 is Sunday, like GitHub. 1 is Monday.'
		},
		{
			name: 'max',
			type: 'number',
			description: 'Lock the intensity scale. Defaults to the highest count.'
		},
		{
			name: 'legend',
			type: 'boolean',
			default: 'true',
			description: 'Less / more glyph key under the grid.'
		},
		{
			name: 'caption',
			type: 'string | false',
			description: 'Replaces the computed contribution total. Pass false to hide it.'
		},
		glyphs,
		palette,
		corner,
		className
	]
} satisfies CatalogEntry;
