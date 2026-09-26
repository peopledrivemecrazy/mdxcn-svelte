import { describe, expect, it } from 'vitest';

import { GraphStack } from '$lib/registry/graph-stack/index.js';

import { examples, html, text } from './render.js';

const modules = import.meta.glob<{ default: import('svelte').Component<any> }>(
	'../docs/examples/graph-stack/*.svelte',
	{ eager: true }
);

describe('GraphStack', () => {
	it('splits the track by share and fills every tick', () => {
		const markup = html(GraphStack, {
			title: 'bundle',
			ticks: 10,
			rows: [{ label: 'app', segments: '50 js, 30 css, 20 img' }]
		});
		expect(markup).toContain('aria-label="app: js, 50, css, 30, img 20"');
		expect(markup.match(/█/g)?.length).toBe(5 + 1);
		expect(markup.match(/▓/g)?.length).toBe(3 + 1);
		expect(markup.match(/▒/g)?.length).toBe(2 + 1);
	});

	it.each(examples(modules))('renders example $name', ({ component }) => {
		const markup = html(component);
		expect(text(markup)).toMatch(/\[ \w+/);
		expect(markup).toMatch(/aria-label="\w+: \w+,? \d+, \w+,? \d+, \w+ \d+"/);
	});
});
