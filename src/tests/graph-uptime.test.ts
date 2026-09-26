import { describe, expect, it } from 'vitest';

import { GraphUptime } from '$lib/registry/graph-uptime/index.js';

import { examples, html, text } from './render.js';

const modules = import.meta.glob<{ default: import('svelte').Component<any> }>(
	'../docs/examples/graph-uptime/*.svelte',
	{ eager: true }
);

describe('GraphUptime', () => {
	it('counts ok days over known days, ignoring empty', () => {
		const markup = text(html(GraphUptime, { title: 'api', days: 'ok ok down empty degraded' }));
		expect(markup).toContain('50%');
		expect(markup).toContain('50 percent uptime over 4 days');
	});

	it('wraps rows at columns', () => {
		const markup = html(GraphUptime, { title: 'api', days: 'ok ok ok ok ok', columns: 2 });
		expect(markup.match(/data-reveal/g)?.length).toBe(3);
	});

	it.each(examples(modules))('renders example $name', ({ component }) => {
		expect(text(html(component))).toMatch(/\[ \w+ \].*\d+%.*up.*slow.*down/);
	});
});
