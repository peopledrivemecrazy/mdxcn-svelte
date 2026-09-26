import { describe, expect, it } from 'vitest';

import { GraphStat } from '$lib/registry/graph-stat/index.js';

import { examples, html, text } from './render.js';

const modules = import.meta.glob<{ default: import('svelte').Component<any> }>(
	'../docs/examples/graph-stat/*.svelte',
	{ eager: true }
);

describe('GraphStat', () => {
	it('draws each item with label, hint, and accent', () => {
		const markup = html(GraphStat, {
			title: 'p95',
			items: [
				{ value: '142ms', label: 'read', hint: '−18ms' },
				{ value: '410ms', label: 'write', accent: true }
			]
		});
		expect(text(markup)).toContain('142ms read −18ms 410ms write');
		expect(markup).toContain('sm:grid-cols-2');
		expect(markup.match(/text-graph-accent/g)?.length).toBe(2);
	});

	it('reads Stat children', () => {
		const markup = text(html(modules['../docs/examples/graph-stat/01-this-week.svelte']!.default));
		expect(markup).toContain('12,400 docs 4,100 copies 860 shipped');
	});

	it.each(examples(modules))('renders example $name', ({ component }) => {
		expect(text(html(component))).toMatch(/\[ \w+/);
	});
});
