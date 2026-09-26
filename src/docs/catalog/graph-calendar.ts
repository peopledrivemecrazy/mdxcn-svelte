import { className, corner, palette, type CatalogEntry } from '../types.js';

export default {
	slug: 'graph-calendar',
	title: 'calendar',
	name: 'GraphCalendar',
	category: 'time',
	description:
		'One month as a seven-column grid. Marked days use the accent. today is wrapped in brackets.',
	importPath: 'mdxcn-svelte/graph-calendar',
	exports: ['GraphCalendar'],
	props: [
		{ name: 'title', type: 'string', description: 'Caption. Defaults to the month name.' },
		{ name: 'year', type: 'number', description: 'Full year.' },
		{ name: 'month', type: 'number', description: '1–12.' },
		{ name: 'weekStartsOn', type: '0 | 1', default: '1', description: '0 is Sunday. 1 is Monday.' },
		{
			name: 'marks',
			type: 'number[] | CalendarMark[] | string',
			description: 'Days to accent. Pass numbers, "12 18", or { day, accent }.'
		},
		{
			name: 'today',
			type: 'number',
			description: 'Day of the month to wrap in brackets. Pass it in.'
		},
		palette,
		corner,
		className
	]
} satisfies CatalogEntry;
