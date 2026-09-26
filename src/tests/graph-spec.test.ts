import { describe, expect, it } from 'vitest';

import { GraphSpec } from '$lib/registry/graph-spec/index.js';

import { examples, html, text } from './render.js';

const modules = import.meta.glob<{ default: import('svelte').Component<any> }>(
	'../docs/examples/graph-spec/*.svelte',
	{ eager: true }
);

describe('GraphSpec', () => {
	it('pairs labels with values', () => {
		const markup = html(GraphSpec, {
			title: 'x',
			rows: [{ label: 'ETA', value: 'Thu', accent: true }]
		});
		expect(markup).toMatch(/<dt[^>]*>ETA<\/dt>/);
		expect(markup).toContain('text-graph-accent');
	});

	it('reads Field children', () => {
		const markup = text(html(modules['../docs/examples/graph-spec/01-type.svelte']!.default));
		expect(markup).toContain('Family Geist Mono');
		expect(markup).toContain('Accent --graph-accent');
	});

	it.each(examples(modules))('renders example $name', ({ component }) => {
		expect(text(html(component))).toMatch(/\[ [\w ]+/);
	});
});
