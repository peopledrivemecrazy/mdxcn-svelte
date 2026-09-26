import { describe, expect, it } from 'vitest';

import { GraphSheet } from '$lib/registry/graph-sheet/index.js';

import { examples, html, text } from './render.js';

const modules = import.meta.glob<{ default: import('svelte').Component<any> }>(
	'../docs/examples/graph-sheet/*.svelte',
	{ eager: true }
);

describe('GraphSheet', () => {
	it('draws one tbody per section with its title', () => {
		const markup = html(GraphSheet, {
			title: 'api',
			headers: ['Name', 'Kind'],
			sections: [
				{ title: 'Frame', rows: [['Graph', 'primitive']] },
				{ title: 'Charts', rows: ['GraphTable | component', 'GraphSheet | component'] }
			],
			footer: 'total | 3'
		});
		expect(markup.match(/<tbody/g)?.length).toBe(2);
		expect(markup.match(/<tr data-reveal/g)?.length).toBe(3);
		const visible = text(markup);
		expect(visible.indexOf('Frame')).toBeLessThan(visible.indexOf('Charts'));
		expect(visible).toContain('total 3');
	});

	it.each(examples(modules))('renders example $name', ({ component }) => {
		expect(text(html(component))).toMatch(/\[ [A-Z]+/);
	});

	it('reads nested Section rows from item children', () => {
		const [rfc] = examples(modules);
		const markup = html(rfc!.component);
		const visible = text(markup);
		expect(visible).toContain('Item Owner Status');
		expect(visible.indexOf('Scope')).toBeLessThan(visible.indexOf('CLI copies files'));
		expect(visible.indexOf('Out of scope')).toBeLessThan(visible.indexOf('Figma kit'));
		expect(markup.match(/<tr data-reveal/g)?.length).toBe(4);
	});
});
