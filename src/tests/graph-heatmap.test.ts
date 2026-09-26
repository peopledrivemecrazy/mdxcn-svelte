import { describe, expect, it } from 'vitest';

import { GraphHeatmap } from '$lib/registry/graph-heatmap/index.js';

import { examples, html, text } from './render.js';

const modules = import.meta.glob<{ default: import('svelte').Component<any> }>(
	'../docs/examples/graph-heatmap/*.svelte',
	{ eager: true }
);

describe('GraphHeatmap', () => {
	it('maps values to intensity glyphs', () => {
		const markup = html(GraphHeatmap, {
			title: 'x',
			columns: 'a b',
			rows: [{ label: 'r', values: '0 8' }],
			legend: false
		});
		expect(markup).toContain('aria-label="r: a 0, b 8"');
		expect(text(markup)).toContain('r · █');
	});

	it('reads Head and Row children', () => {
		const markup = html(modules['../docs/examples/graph-heatmap/01-punchcard.svelte']!.default);
		expect(markup).toContain('aria-label="Wed: 0 1, 4 0, 8 6, 12 12, 16 5, 20 1"');
		expect(text(markup)).toContain('Less');
	});

	it.each(examples(modules))('renders example $name', ({ component }) => {
		expect(text(html(component))).toMatch(/\[ \w+/);
	});
});
