import { describe, expect, it } from 'vitest';

import { GraphTimer } from '$lib/registry/graph-timer/index.js';

import { examples, html, text } from './render.js';

const modules = import.meta.glob<{ default: import('svelte').Component<any> }>(
	'../docs/examples/graph-timer/*.svelte',
	{ eager: true }
);

describe('GraphTimer', () => {
	it('renders the placeholder on the server', () => {
		expect(text(html(GraphTimer, { title: 't', at: 0 }))).toContain('00:00:00 timer');
		expect(text(html(GraphTimer, { title: 't', kind: 'ago', at: 0 }))).toContain('0s ago timer');
		expect(text(html(GraphTimer, { title: 't', kind: 'clock' }))).toContain('00:00:00 timer');
	});

	it.each(examples(modules))('renders example $name', ({ component }) => {
		expect(text(html(component))).toMatch(/\[ \w+ \] .*(00:00:00|0s ago)/);
	});
});
