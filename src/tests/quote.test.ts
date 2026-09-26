import { createRawSnippet } from 'svelte';
import { describe, expect, it } from 'vitest';

import { Quote } from '$lib/registry/quote/index.js';

import { examples, html, text } from './render.js';

const modules = import.meta.glob<{ default: import('svelte').Component<any> }>(
	'../docs/examples/quote/*.svelte',
	{ eager: true }
);

const body = createRawSnippet(() => ({ render: () => '<p>less, but better</p>' }));

describe('Quote', () => {
	it('draws the quote, the name and the source', () => {
		const markup = html(Quote, { by: 'Dieter Rams', source: 'Ten principles', children: body });
		expect(text(markup)).toContain('less, but better');
		expect(markup).toContain('<cite');
		expect(text(markup)).toContain('— Dieter Rams Ten principles');
	});

	it('drops the footer without a name or source', () => {
		const markup = html(Quote, { children: body });
		expect(markup).not.toContain('<footer');
		expect(markup).not.toContain('<figcaption');
	});

	it.each(examples(modules))('renders example $name', ({ component }) => {
		expect(text(html(component))).toMatch(/— \w+/);
	});
});
