import { describe, expect, it } from 'vitest';

import { GraphMatrix } from '$lib/registry/graph-matrix/index.js';

import { examples, html, text } from './render.js';

const modules = import.meta.glob<{ default: import('svelte').Component<any> }>(
	'../docs/examples/graph-matrix/*.svelte',
	{ eager: true }
);

describe('GraphMatrix', () => {
	it('formats numbers and dims rows off the accent', () => {
		const markup = html(GraphMatrix, {
			title: 'x',
			columns: ['a', 'b'],
			accent: 'hot',
			rows: [
				{ label: 'hot', values: [12400, 1.25] },
				{ label: 'cold', values: [3, 'n/a'] }
			]
		});
		const out = text(markup);
		expect(out).toContain('a b hot 12,400 1.3 cold 3 n/a');
		expect(markup.match(/opacity: 0.4/g)?.length).toBe(1);
		expect(out).toContain('Matrix with 2 rows and 2 columns');
	});

	it('reads Head and Row items', () => {
		const out = text(html(modules['../docs/examples/graph-matrix/01-detect.svelte']!.default));
		expect(out).toContain('Pos Neg Pos 41 3 Neg 2 54');
	});

	it.each(examples(modules))('renders example $name', ({ component }) => {
		expect(text(html(component))).toMatch(/\[ \w+ \]/);
	});
});
