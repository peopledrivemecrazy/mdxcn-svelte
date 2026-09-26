import { describe, expect, it } from 'vitest';

import { GraphPlot } from '$lib/registry/graph-plot/index.js';

import { examples, html, text } from './render.js';

const modules = import.meta.glob<{ default: import('svelte').Component<any> }>(
	'../docs/examples/graph-plot/*.svelte',
	{ eager: true }
);

describe('GraphPlot', () => {
	it('caps each column and fills the area below', () => {
		const markup = html(GraphPlot, { title: 'p', data: '0 4', height: 5 });
		expect(text(markup)).toContain('area plot, 2 points, min 0, max 4');
		expect(markup.match(/█/g)?.length).toBe(2);
		expect(markup.match(/░/g)?.length).toBe(4);
	});

	it('reveals only a prefix with progress', () => {
		const markup = html(GraphPlot, {
			title: 'p',
			data: [1, 2, 3, 4],
			progress: 0.5,
			variant: 'line'
		});
		expect(markup.match(/█/g)?.length).toBe(2);
	});

	it.each(examples(modules))('renders example $name', ({ component }) => {
		const visible = text(html(component));
		expect(visible).toMatch(/plot, \d+ points/);
	});
});
