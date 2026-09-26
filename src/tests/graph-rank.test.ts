import { describe, expect, it } from 'vitest';

import { GraphRank } from '$lib/registry/graph-rank/index.js';

import { examples, html, text } from './render.js';

const modules = import.meta.glob<{ default: import('svelte').Component<any> }>(
	'../docs/examples/graph-rank/*.svelte',
	{ eager: true }
);

describe('GraphRank', () => {
	it('scales bars to the largest value', () => {
		const markup = text(
			html(GraphRank, {
				title: 'r',
				ticks: 4,
				items: [
					{ label: 'a', value: 100 },
					{ label: 'b', value: 50 }
				]
			})
		);
		expect(markup).toContain('a [ = = = = ] 100');
		expect(markup).toContain('b [ = = - - ] 50');
	});

	it.each(examples(modules))('renders example $name', ({ component }) => {
		const markup = html(component);
		expect(markup.match(/<li/g)?.length).toBeGreaterThanOrEqual(3);
		expect(text(markup)).toMatch(/\[ \w+ \]/);
	});
});
