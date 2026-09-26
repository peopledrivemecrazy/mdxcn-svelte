import { describe, expect, it } from 'vitest';

import { GraphSlope, Slope } from '$lib/registry/graph-slope/index.js';

import { examples, html, text } from './render.js';

const modules = import.meta.glob<{ default: import('svelte').Component<any> }>(
	'../docs/examples/graph-slope/*.svelte',
	{ eager: true }
);

describe('GraphSlope', () => {
	it('formats both figures from data', () => {
		const markup = text(
			html(GraphSlope, {
				title: 't',
				fromLabel: 'a',
				toLabel: 'b',
				items: [{ label: 'docs', from: '8,200', to: 12400 }]
			})
		);
		expect(markup).toContain('docs 8,200 → 12,400');
	});

	it('marks flat rows with a dash', () => {
		const markup = text(
			html(GraphSlope, {
				title: 't',
				fromLabel: 'a',
				toLabel: 'b',
				items: [{ label: 'c', from: 12, to: 12 }]
			})
		);
		expect(markup).toContain('c 12 – 12');
	});

	it('exports the item component', () => {
		expect(Slope).toBeTypeOf('function');
	});

	it.each(examples(modules))('renders example $name', ({ component }) => {
		const markup = html(component);
		expect(markup.match(/<li/g)?.length).toBe(3);
		expect(text(markup)).toMatch(/\[ \w+/);
	});
});
