import { describe, expect, it } from 'vitest';

import { GraphKpi } from '$lib/registry/graph-kpi/index.js';

import { examples, html, text } from './render.js';

const modules = import.meta.glob<{ default: import('svelte').Component<any> }>(
	'../docs/examples/graph-kpi/*.svelte',
	{ eager: true }
);

describe('GraphKpi', () => {
	it('draws one spark glyph per point, dimming all but the last in mono', () => {
		const markup = html(GraphKpi, { title: 'k', value: '12', label: 'l', data: '1 2 4 8' });
		expect(text(markup)).toContain('▂ ▃ ▅ █');
		expect(markup.match(/opacity: 0.4/g)?.length).toBe(3);
	});

	it('skips the track without data', () => {
		expect(html(GraphKpi, { title: 'k', value: '1', label: 'l', data: '' })).not.toContain('▁');
	});

	it.each(examples(modules))('renders example $name', ({ component }) => {
		expect(text(html(component))).toMatch(/\[ \w+ \]/);
	});
});
