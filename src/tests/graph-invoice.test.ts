import { describe, expect, it } from 'vitest';

import { GraphInvoice } from '$lib/registry/graph-invoice/index.js';

import { examples, html, text } from './render.js';

const modules = import.meta.glob<{ default: import('svelte').Component<any> }>(
	'../docs/examples/graph-invoice/*.svelte',
	{ eager: true }
);

describe('GraphInvoice', () => {
	it('splits party strings into name and address lines', () => {
		const out = text(
			html(GraphInvoice, {
				title: 'x',
				from: 'mdxcn\n12 Main St',
				to: { name: 'Acme', lines: ['Suite 4'] },
				items: [{ description: 'Work', amount: '10' }]
			})
		);
		expect(out).toContain('From mdxcn 12 Main St Bill to Acme Suite 4');
	});

	it('hides qty and rate columns nobody uses', () => {
		const out = text(
			html(GraphInvoice, { title: 'x', items: [{ description: 'Work', amount: '10' }] })
		);
		expect(out).toContain('Description Amount Work 10');
		expect(out).not.toContain('Qty');
	});

	it('reads item children', () => {
		const out = text(
			html(modules['../docs/examples/graph-invoice/01-studio-invoice.svelte']!.default)
		);
		expect(out).toContain('Due Apr 11, 2026');
		expect(out).toContain('Description Qty Rate Amount');
		expect(out).toContain('Docs rewrite 8h 180 1,440');
		expect(out).toContain('Amount due 7,440');
		expect(out).toContain('Net 30.');
	});

	it.each(examples(modules))('renders example $name', ({ component }) => {
		expect(text(html(component))).toMatch(/\[ \w+/);
	});
});
