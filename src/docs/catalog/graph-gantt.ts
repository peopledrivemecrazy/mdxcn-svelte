import { className, corner, glyphs, palette, type CatalogEntry } from '../types.js';

export default {
	slug: 'graph-gantt',
	title: 'gantt',
	name: 'GraphGantt',
	category: 'diagrams',
	description:
		'Work that overlaps on a shared calendar. Write <Span label="build" start={0.2} end={0.75} complete={0.55} />. A dated log is Timeline.',
	importPath: 'mdxcn-svelte/graph-gantt',
	exports: ['GraphGantt', 'Span'],
	props: [
		{ name: 'title', type: 'string', description: 'Caption drawn on the top edge of the frame.' },
		{
			name: 'items',
			type: 'GanttItem[]',
			description:
				'label, start, end, optional complete (0–1 fill inside the bar). Or write <Span /> children.'
		},
		{ name: 'children', type: 'Snippet', description: '<Span /> items.' },
		{
			name: 'ticks',
			type: 'string[] | string',
			description: 'Labels under the track, spaced at the ends.'
		},
		{ name: 'columns', type: 'number', default: '24', description: 'Track width in characters.' },
		{ name: 'stage', type: 'string', description: 'Row label to focus. Other rows recede.' },
		{ name: 'progress', type: 'number', description: '0–1 playhead. Draws ▾ on the track.' },
		glyphs,
		palette,
		corner,
		className
	],
	items: [
		{
			name: 'Span',
			description: 'One bar on the track.',
			props: [
				{ name: 'label', type: 'string', description: 'Row label on the left.' },
				{ name: 'start', type: 'number | string', description: '0–1 along the track.' },
				{ name: 'end', type: 'number | string', description: '0–1 along the track.' },
				{
					name: 'complete',
					type: 'number | string',
					default: '1',
					description: '0–1 fill inside the bar.'
				},
				{
					name: 'accent',
					type: 'boolean',
					description: 'Paint the row with the accent when no stage is set.'
				}
			]
		}
	]
} satisfies CatalogEntry;
