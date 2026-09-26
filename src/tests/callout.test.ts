import { createRawSnippet } from 'svelte';
import { describe, expect, it } from 'vitest';

import { Callout } from '$lib/registry/callout/index.js';

import { examples, html, text } from './render.js';

const modules = import.meta.glob<{ default: import('svelte').Component<any> }>(
	'../docs/examples/callout/*.svelte',
	{ eager: true }
);

const body = createRawSnippet(() => ({ render: () => '<p>mind the gap</p>' }));

describe('Callout', () => {
	it('titles the frame with the type and draws its glyph', () => {
		const markup = html(Callout, { type: 'danger', children: body });
		expect(text(markup)).toContain('[ danger ]');
		expect(markup).toContain('×');
		expect(markup).toContain('text-destructive');
		expect(markup).toContain('role="note"');
		expect(text(markup)).toContain('mind the gap');
	});

	it('defaults to note and lets title override the type', () => {
		expect(text(html(Callout, {}))).toContain('[ note ]');
		expect(text(html(Callout, { type: 'tip', title: 'Palette' }))).toContain('[ Palette ]');
	});

	it.each(examples(modules))('renders example $name', ({ component }) => {
		expect(text(html(component))).toMatch(/\[ \w+/);
	});
});
