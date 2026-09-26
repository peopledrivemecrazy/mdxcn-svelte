import { describe, expect, it } from 'vitest';

import { GraphSpark } from '$lib/registry/graph-spark/index.js';

import { examples, html, text } from './render.js';

const modules = import.meta.glob<{ default: import('svelte').Component<any> }>(
	'../docs/examples/graph-spark/*.svelte',
	{ eager: true }
);

describe('GraphSpark', () => {
	it('scales points to the max and dims all but the last', () => {
		const markup = html(GraphSpark, { title: 'x', data: '0 4 8' });
		expect(text(markup)).toContain('▁ ▅ █');
		expect(markup.match(/opacity: 0.4/g)?.length).toBe(2);
		expect(markup).toContain('Sparkline with 3 points');
	});

	it('keeps every point bright on a colored palette', () => {
		expect(html(GraphSpark, { title: 'x', data: [1, 2], palette: 'duo' })).not.toContain('opacity');
	});

	it.each(examples(modules))('renders example $name', ({ component }) => {
		expect(text(html(component))).toMatch(/\[ [A-Z]+ \]/);
	});
});
