import { describe, expect, it } from 'vitest';

import { GraphMeter } from '$lib/registry/graph-meter/index.js';

import { examples, html, text } from './render.js';

const modules = import.meta.glob<{ default: import('svelte').Component<any> }>(
	'../docs/examples/graph-meter/*.svelte',
	{ eager: true }
);

describe('GraphMeter', () => {
	it('fills ticks in proportion and prints the percent', () => {
		const markup = html(GraphMeter, { title: 'build', value: '50%', ticks: 10 });
		expect(text(markup)).toContain('50%');
		expect(markup.match(/data-reveal/g)?.length).toBe(5);
	});

	it('clamps values above one', () => {
		expect(text(html(GraphMeter, { title: 'x', value: 3 }))).toContain('100%');
	});

	it.each(examples(modules))('renders example $name', ({ component }) => {
		expect(text(html(component))).toMatch(/\[ \w+/);
	});
});
