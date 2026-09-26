import { describe, expect, it } from 'vitest';

import { GraphTimeline } from '$lib/registry/graph-timeline/index.js';

import { examples, html, text } from './render.js';

const modules = import.meta.glob<{ default: import('svelte').Component<any> }>(
	'../docs/examples/graph-timeline/*.svelte',
	{ eager: true }
);

describe('GraphTimeline', () => {
	it('draws a mark per event and a connector between them', () => {
		const markup = html(GraphTimeline, {
			title: 'log',
			events: [
				{ date: 'Mar 12', label: 'cli' },
				{ date: 'Mar 18', label: 'docs', state: 'now' },
				{ date: 'Apr 02', label: 'registry', state: 'next' }
			]
		});
		const visible = text(markup);
		expect(visible).toContain('● Mar 12 cli');
		expect(visible).toContain('○ Apr 02 registry');
		expect(markup.match(/│/g)?.length).toBe(2);
		expect(markup.match(/data-reveal/g)?.length).toBe(3);
	});

	it.each(examples(modules))('renders example $name', ({ component }) => {
		const visible = text(html(component));
		expect(visible).toMatch(/\[ \w+/);
		expect(visible).toContain('●');
		expect(visible).toContain('○');
	});
});
