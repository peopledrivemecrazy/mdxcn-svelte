import { className, corner, glyphs, palette, type CatalogEntry } from '../types.js';

export default {
	slug: 'graph-uptime',
	title: 'uptime',
	name: 'GraphUptime',
	category: 'time',
	description: 'One glyph per day. ok, degraded, down, or empty. Wraps every 30 days.',
	importPath: 'mdxcn-svelte/graph-uptime',
	exports: ['GraphUptime'],
	props: [
		{ name: 'title', type: 'string', description: 'Caption drawn on the top edge of the frame.' },
		{
			name: 'days',
			type: 'UptimeStatus[] | string',
			description: 'ok, degraded, down, or empty. An array or "ok ok down".'
		},
		{ name: 'from', type: 'string', description: 'Label at the start of the range.' },
		{ name: 'to', type: 'string', description: 'Label at the end of the range.' },
		{
			name: 'columns',
			type: 'number',
			default: '30',
			description: 'Days per row. Short series are not padded to this width.'
		},
		glyphs,
		palette,
		corner,
		className
	]
} satisfies CatalogEntry;
