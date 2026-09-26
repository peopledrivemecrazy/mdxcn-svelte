import { describe, expect, it } from 'vitest';

import { GraphBars } from '$lib/registry/graph-bars/index.js';

import { examples, html, text } from './render.js';

const modules = import.meta.glob<{ default: import('svelte').Component<any> }>(
	'../docs/examples/graph-bars/*.svelte',
	{ eager: true }
);

describe('GraphBars', () => {
	it('fills a column up to its scaled height', () => {
		const markup = html(GraphBars, {
			title: 'x',
			from: { label: 'before', values: [1, 2] },
			to: { label: 'after', values: '4', size: 'lg' }
		});
		// from: height 5, levels 2 and 4 → 3 + 5 cells. to: height 8, level 7 → 8 cells.
		expect(markup.match(/data-reveal/g)?.length).toBe(16);
		expect(text(markup)).toContain('before');
		expect(text(markup)).toContain('after');
	});

	it.each(examples(modules))('renders example $name', ({ component }) => {
		expect(text(html(component))).toMatch(/\[ [A-Z ]+ \]/);
	});

	it('reads two Series children and the processor', () => {
		const [, drafted] = examples(modules);
		const visible = text(html(drafted!.component));
		expect(visible).toContain('draft');
		expect(visible).toContain('edit');
		expect(visible).toContain('shipped');
	});
});
