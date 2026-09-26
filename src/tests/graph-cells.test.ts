import { describe, expect, it } from 'vitest';

import { GraphCells } from '$lib/registry/graph-cells/index.js';

import { examples, html, text } from './render.js';

const modules = import.meta.glob<{ default: import('svelte').Component<any> }>(
	'../docs/examples/graph-cells/*.svelte',
	{ eager: true }
);
import { gridCells } from '$lib/registry/graph-cells/types.js';

describe('GraphCells', () => {
	it('parses rows on slashes or newlines', () => {
		expect(gridCells('1 0 / 0 1')).toEqual([
			[1, 0],
			[0, 1]
		]);
		expect(gridCells('1 1\n0 0')).toEqual([
			[1, 1],
			[0, 0]
		]);
	});

	it('draws filled and empty glyphs', () => {
		const markup = html(GraphCells, { title: 'x', items: [{ label: 'a', cells: [[1, 0, 1]] }] });
		expect(markup.match(/data-reveal/g)?.length).toBe(2);
		expect(markup.match(/█/g)?.length).toBe(2);
		expect(markup.match(/·/g)?.length).toBe(1);
	});

	it.each(examples(modules))('renders example $name', ({ component }) => {
		expect(text(html(component))).toMatch(/\[ [A-Z ]+ \]/);
	});

	it('reads Grid children', () => {
		const [learn] = examples(modules);
		const markup = html(learn!.component);
		expect(text(markup)).toContain('fragments');
		expect(text(markup)).toContain('a system');
		expect(markup.match(/█/g)?.length).toBe(6 + 15);
	});
});
