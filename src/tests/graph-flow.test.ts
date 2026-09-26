import { describe, expect, it } from 'vitest';

import { GraphFlow } from '$lib/registry/graph-flow/index.js';

import { examples, html, text } from './render.js';

const modules = import.meta.glob<{ default: import('svelte').Component<any> }>(
	'../docs/examples/graph-flow/*.svelte',
	{ eager: true }
);
import { nodesOf } from '$lib/registry/graph-flow/types.js';

describe('GraphFlow', () => {
	it('splits paths on arrows and reads bold and italic tones', () => {
		expect(nodesOf('tap -> **update** → *server syncs*')).toEqual([
			{ label: 'tap' },
			{ label: 'update', tone: 'accent' },
			{ label: 'server syncs', tone: 'muted' }
		]);
	});

	it('draws an arrow between nodes and accents the live one', () => {
		const markup = html(GraphFlow, {
			title: 'flow',
			rows: [{ nodes: [{ label: 'a' }, { label: 'b', tone: 'accent' }] }]
		});
		expect(markup.match(/▶/g)?.length).toBe(1);
		expect(markup).toMatch(/text-graph-accent[^"]*">b</);
	});

	it.each(examples(modules))('renders example $name', ({ component }) => {
		expect(text(html(component))).toMatch(/\[ [A-Z ]+ \]/);
	});

	it('renders Path children as rows', () => {
		const [optimistic] = examples(modules);
		const markup = html(optimistic!.component);
		expect(markup.match(/data-reveal/g)?.length).toBe(2);
		expect(text(markup)).toContain('server syncs');
		expect(text(markup)).not.toContain('*');
	});
});
