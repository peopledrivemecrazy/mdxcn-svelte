import { describe, expect, it } from 'vitest';

import { GraphDiff } from '$lib/registry/graph-diff/index.js';

import { examples, html, text } from './render.js';

const modules = import.meta.glob<{ default: import('svelte').Component<any> }>(
	'../docs/examples/graph-diff/*.svelte',
	{ eager: true }
);

describe('GraphDiff', () => {
	it('draws sign glyphs and a footer under a rule', () => {
		const markup = html(GraphDiff, {
			title: 'x',
			rows: [
				{ label: 'app', value: '31 kb', sign: 'add' },
				{ label: 'maps', value: '12 kb', sign: 'remove' }
			],
			footer: { label: 'shipped', value: '103 kb' }
		});
		const out = text(markup);
		expect(out).toContain('+ app 31 kb - maps 12 kb');
		expect(out).toMatch(/12 kb\s+shipped 103 kb/);
		expect(markup).toContain('graph-rule');
	});

	it('reads Line items and splits out the total', () => {
		const out = text(html(modules['../docs/examples/graph-diff/01-bundle.svelte']!.default));
		expect(out).toContain('+ app 31 kb');
		expect(out).toContain('- sourcemaps 12 kb');
		expect(out.indexOf('sourcemaps')).toBeLessThan(out.indexOf('shipped 103 kb'));
	});

	it.each(examples(modules))('renders example $name', ({ component }) => {
		expect(text(html(component))).toMatch(/\[ \w+ \]/);
	});
});
