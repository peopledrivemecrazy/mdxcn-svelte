import { describe, expect, it } from 'vitest';

import { GraphFunnel } from '$lib/registry/graph-funnel/index.js';

import { examples, html, text } from './render.js';

const modules = import.meta.glob<{ default: import('svelte').Component<any> }>(
	'../docs/examples/graph-funnel/*.svelte',
	{ eager: true }
);

describe('GraphFunnel', () => {
	it('narrows bars and prints the share of the first step', () => {
		const visible = text(
			html(GraphFunnel, {
				title: 'f',
				ticks: 10,
				steps: [
					{ label: 'visit', value: 1000 },
					{ label: 'paid', value: 250 }
				]
			})
		);
		expect(visible).toContain('1,000');
		expect(visible).toContain('25%');
	});

	it.each(examples(modules))('renders example $name', ({ component }) => {
		const visible = text(html(component));
		expect(visible).toMatch(/\d+,\d{3}/);
		expect(visible).toMatch(/\d+%/);
	});

	it('dims every step but the focused stage', () => {
		const markup = html(modules['../docs/examples/graph-funnel/01-install.svelte'].default);
		expect(markup.match(/opacity: 0.4/g)?.length).toBe(2);
	});
});
