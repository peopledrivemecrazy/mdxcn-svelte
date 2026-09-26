import { describe, expect, it } from 'vitest';

import { GraphTable } from '$lib/registry/graph-table/index.js';

import { examples, html, text } from './render.js';

const modules = import.meta.glob<{ default: import('svelte').Component<any> }>(
	'../docs/examples/graph-table/*.svelte',
	{ eager: true }
);

describe('GraphTable docs', () => {
	it('renders headers, rows and footer from data', () => {
		const markup = html(GraphTable, {
			title: 'usage',
			headers: 'Name | Value',
			rows: ['docs | 12,400', ['api', 900]],
			footer: 'total | 13,300'
		});
		const visible = text(markup);
		expect(visible).toContain('[ usage ]');
		expect(visible.indexOf('Name')).toBeLessThan(visible.indexOf('docs'));
		expect(visible).toContain('13,300');
		expect(markup.match(/<tr data-reveal/g)?.length).toBe(2);
	});

	it.each(examples(modules))('renders example $name', ({ component }) => {
		expect(text(html(component))).toMatch(/\[ [A-Z]+/);
	});

	it('draws the research cost example with its total', () => {
		const [first] = examples(modules);
		const visible = text(html(first!.component));
		expect(visible).toContain('Tool calls');
		expect(visible).toContain('Naming the patterns');
		expect(visible).toContain('437,141');
	});
});
