import { describe, expect, it } from 'vitest';

import { GraphTree } from '$lib/registry/graph-tree/index.js';

import { examples, html, text } from './render.js';

const modules = import.meta.glob<{ default: import('svelte').Component<any> }>(
	'../docs/examples/graph-tree/*.svelte',
	{ eager: true }
);

describe('GraphTree', () => {
	it('draws branch glyphs for several roots', () => {
		const markup = html(GraphTree, {
			title: 'x',
			nodes: [{ label: 'a', children: [{ label: 'b' }] }, { label: 'c' }]
		});
		expect(text(markup)).toContain('├─ a');
		expect(text(markup)).toContain('│ └─ b');
		expect(text(markup)).toContain('└─ c');
	});

	it.each(examples(modules))('renders example $name', ({ component }) => {
		expect(text(html(component))).toMatch(/\[ [A-Z ]+ \]/);
	});

	it('reads nested Node children in order and dims the rest around an accent', () => {
		const [registry] = examples(modules);
		const markup = html(registry!.component);
		const visible = text(markup);
		expect(visible).toContain('registry/default');
		expect(visible).toContain('├─ graph-frame');
		expect(visible).toContain('│ ├─ graph-frame.tsx ui');
		expect(visible).toContain('└─ graph-tree');
		expect(visible).toContain('Tree with 6 nodes');
		expect(markup.match(/<li[^>]*data-reveal/g)?.length).toBe(6);
	});
});
