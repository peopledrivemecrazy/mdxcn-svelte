import { describe, expect, it } from 'vitest';

import { GraphCheck } from '$lib/registry/graph-check/index.js';

import { examples, html, text } from './render.js';

const modules = import.meta.glob<{ default: import('svelte').Component<any> }>(
	'../docs/examples/graph-check/*.svelte',
	{ eager: true }
);

describe('GraphCheck', () => {
	it('marks done items and counts them', () => {
		const visible = text(
			html(GraphCheck, {
				title: 'launch',
				items: [
					{ label: 'freeze', done: true },
					{ label: 'ship', note: 'still open' }
				]
			})
		);
		expect(visible).toContain('[x] freeze');
		expect(visible).toContain('[ ] ship still open');
		expect(visible).toContain('1 of 2 done');
	});

	it.each(examples(modules))('renders example $name', ({ component }) => {
		const visible = text(html(component));
		expect(visible).toContain('[x]');
		expect(visible).toContain('2 of 3 done');
	});
});
