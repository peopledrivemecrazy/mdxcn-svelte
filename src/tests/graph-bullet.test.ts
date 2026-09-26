import { describe, expect, it } from 'vitest';

import { GraphBullet } from '$lib/registry/graph-bullet/index.js';

import { examples, html, text } from './render.js';

const modules = import.meta.glob<{ default: import('svelte').Component<any> }>(
	'../docs/examples/graph-bullet/*.svelte',
	{ eager: true }
);

describe('GraphBullet', () => {
	it('draws the target marker and value / target', () => {
		const markup = text(
			html(GraphBullet, {
				title: 'b',
				ticks: 10,
				items: [{ label: 'CPU', value: 50, target: 80, max: 100 }]
			})
		);
		expect(markup).toContain('CPU [ = = = = = - - - | - ] 50 / 80');
	});

	it('prefers display', () => {
		const markup = text(
			html(GraphBullet, { title: 'b', items: [{ label: 'x', value: 1, display: 'one' }] })
		);
		expect(markup).toContain('one');
	});

	it.each(examples(modules))('renders example $name', ({ component }) => {
		const markup = text(html(component));
		expect(markup).toMatch(/\d+ \/ \d+/);
		expect(markup).toContain('|');
	});
});
