import { describe, expect, it } from 'vitest';

import { GraphWaterfall } from '$lib/registry/graph-waterfall/index.js';

import { examples, html, text } from './render.js';

const modules = import.meta.glob<{ default: import('svelte').Component<any> }>(
	'../docs/examples/graph-waterfall/*.svelte',
	{ eager: true }
);

describe('GraphWaterfall', () => {
	it('infers start, in, out, and end', () => {
		const plain = text(
			html(GraphWaterfall, {
				title: 'x',
				items: [
					{ label: 'Start', value: 12 },
					{ label: 'Hired', value: 4 },
					{ label: 'Left', value: '-2' },
					{ label: 'Now', value: 14 }
				]
			})
		);
		expect(plain).toContain('Start 12, Hired +4, Left −2, Now 14');
	});

	it('reads Delta children', () => {
		const plain = text(html(modules['../docs/examples/graph-waterfall/01-margin.svelte']!.default));
		expect(plain).toContain('Revenue 48, Refunds −6, Hosting −4, Profit 38');
	});

	it.each(examples(modules))('renders example $name', ({ component }) => {
		expect(text(html(component))).toMatch(/\[ \w+/);
	});
});
