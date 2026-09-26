import { describe, expect, it } from 'vitest';

import { GraphCompare } from '$lib/registry/graph-compare/index.js';

import { examples, html, text } from './render.js';

const modules = import.meta.glob<{ default: import('svelte').Component<any> }>(
	'../docs/examples/graph-compare/*.svelte',
	{ eager: true }
);

describe('GraphCompare', () => {
	it('draws booleans as marks and dims columns off the accent', () => {
		const markup = html(GraphCompare, {
			title: 'x',
			columns: 'A B',
			accent: 'B',
			rows: [{ label: 'thing', values: [false, true] }]
		});
		expect(text(markup)).toContain('A B thing – ✓');
		expect(markup).toContain('opacity: 0.4');
	});

	it('reads Col and Row items', () => {
		const out = text(html(modules['../docs/examples/graph-compare/01-plans.svelte']!.default));
		expect(out).toContain('Solo Studio');
		expect(out).toContain('Private source – ✓');
		expect(out).toContain('Price $0 $24');
	});

	it('reads a Head item for columns', () => {
		const out = text(
			html(modules['../docs/examples/graph-compare/02-before-after.svelte']!.default)
		);
		expect(out).toContain('Mermaid SVG This');
		expect(out).toContain('In git ✓ – ✓');
	});

	it.each(examples(modules))('renders example $name', ({ component }) => {
		expect(text(html(component))).toMatch(/\[ \w+ \]/);
	});
});
