import { describe, expect, it } from 'vitest';

import { GraphCountdown } from '$lib/registry/graph-countdown/index.js';

import { examples, html, text } from './render.js';

const modules = import.meta.glob<{ default: import('svelte').Component<any> }>(
	'../docs/examples/graph-countdown/*.svelte',
	{ eager: true }
);

describe('GraphCountdown', () => {
	it('renders the placeholder on the server, even for a past date', () => {
		const markup = text(
			html(GraphCountdown, { title: 'c', to: '2020-01-01T00:00:00Z', done: 'closed' })
		);
		expect(markup).toContain('00:00:00');
		expect(markup).toContain('remaining 00:00:00');
		expect(markup).not.toContain('closed');
	});

	it.each(examples(modules))('renders example $name', ({ component }) => {
		expect(text(html(component))).toMatch(/\[ \w+ \].* 00:00:00/);
	});
});
