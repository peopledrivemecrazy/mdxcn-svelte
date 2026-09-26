import { describe, expect, it } from 'vitest';

import { GraphActivity } from '$lib/registry/graph-activity/index.js';

import { examples, html, text } from './render.js';

const modules = import.meta.glob<{ default: import('svelte').Component<any> }>(
	'../docs/examples/graph-activity/*.svelte',
	{ eager: true }
);

describe('GraphActivity', () => {
	const days = [
		{ date: '2026-01-30', count: 0 },
		{ date: '2026-01-31', count: 2 },
		{ date: '2026-02-01', count: 4 }
	];

	it('pads to whole weeks, labels months, and totals counts', () => {
		const markup = html(GraphActivity, { title: 'commits', days });
		const plain = text(markup);
		expect(plain).toContain('Feb');
		expect(plain).toContain('6 contributions');
		// Fri 30 Jan → Sat 7 Feb with Sunday start: two week columns.
		expect(markup.match(/data-reveal/g)?.length).toBe(2);
		expect(plain).toContain('█');
	});

	it('hides the caption with false and keeps the legend', () => {
		const markup = html(GraphActivity, { title: 'x', days, caption: false });
		expect(markup).not.toContain('tabular-nums">6 contributions');
		expect(markup).toContain('justify-end');
		expect(text(markup)).toContain('Less');
	});

	it('renders the same markup twice', () => {
		expect(html(GraphActivity, { title: 'x', days })).toBe(
			html(GraphActivity, { title: 'x', days })
		);
	});

	it.each(examples(modules))('renders example $name', ({ component }) => {
		expect(text(html(component))).toMatch(/contributions/);
	});
});
