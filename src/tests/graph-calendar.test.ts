import { describe, expect, it } from 'vitest';

import { GraphCalendar } from '$lib/registry/graph-calendar/index.js';

import { examples, html, text } from './render.js';

const modules = import.meta.glob<{ default: import('svelte').Component<any> }>(
	'../docs/examples/graph-calendar/*.svelte',
	{ eager: true }
);

describe('GraphCalendar', () => {
	it('titles by month, brackets today, and lists marks', () => {
		const plain = text(html(GraphCalendar, { year: 2026, month: 8, today: 27, marks: '12 18' }));
		expect(plain).toContain('[ August 2026 ]');
		expect(plain).toContain('[27]');
		expect(plain).toContain('marked 12, 18');
	});

	it('offsets the first day by weekday', () => {
		// 1 Feb 2026 is a Sunday: six leading and one trailing blank with a
		// Monday start, none with a Sunday start.
		const monday = html(GraphCalendar, { year: 2026, month: 2 });
		const sunday = html(GraphCalendar, { year: 2026, month: 2, weekStartsOn: 0 });
		expect(monday.match(/text-transparent/g)?.length).toBe(7);
		expect(sunday.match(/text-transparent/g)).toBeNull();
	});

	it.each(examples(modules))('renders example $name', ({ component }) => {
		expect(text(html(component))).toMatch(/\[ [\w ]+ \]/);
	});
});
