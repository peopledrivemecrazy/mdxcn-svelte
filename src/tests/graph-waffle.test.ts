import { describe, expect, it } from 'vitest';

import { GraphWaffle } from '$lib/registry/graph-waffle/index.js';

import { examples, html, text } from './render.js';

const modules = import.meta.glob<{ default: import('svelte').Component<any> }>(
	'../docs/examples/graph-waffle/*.svelte',
	{ eager: true }
);

describe('GraphWaffle', () => {
	it('lights cells in proportion and prints the percent', () => {
		const markup = html(GraphWaffle, { title: 'x', value: '73%' });
		expect(text(markup)).toContain('73%');
		expect(markup.match(/data-reveal/g)?.length).toBe(73);
		expect(markup.match(/░/g)?.length).toBe(27);
	});

	it('pads the last row when cells do not fill it', () => {
		const markup = html(GraphWaffle, { title: 'x', value: 1, cells: 7, columns: 4 });
		expect(markup.match(/█/g)?.length).toBe(7);
		expect(markup.match(/min-w-\[1ch\] flex-1"/g)?.length).toBe(1);
	});

	it('clamps values above one', () => {
		expect(text(html(GraphWaffle, { title: 'x', value: 3 }))).toContain('100%');
	});

	it.each(examples(modules))('renders example $name', ({ component }) => {
		expect(text(html(component))).toMatch(/\[ \w+.*%/);
	});
});
