import { describe, expect, it } from 'vitest';

import { GraphGantt } from '$lib/registry/graph-gantt/index.js';

import { examples, html, text } from './render.js';

const modules = import.meta.glob<{ default: import('svelte').Component<any> }>(
	'../docs/examples/graph-gantt/*.svelte',
	{ eager: true }
);

describe('GraphGantt', () => {
	it('places a bar between start and end with a playhead', () => {
		const markup = html(GraphGantt, {
			title: 'g',
			columns: 10,
			progress: 0,
			items: [{ label: 'build', start: 0.2, end: 0.6, complete: 0.5 }]
		});
		expect(markup).toContain('aria-label="build from 20% to 60%, 50% complete"');
		expect(markup.match(/█/g)?.length).toBe(2);
		expect(markup.match(/░/g)?.length).toBe(2);
		expect(markup.match(/▾/g)?.length).toBe(10);
	});

	it.each(examples(modules))('renders example $name', ({ component }) => {
		const markup = html(component);
		expect(text(markup)).toMatch(/\[ [\w ]+ \]/);
		expect(markup).toMatch(/aria-label="\w+ from \d+% to \d+%/);
	});
});
