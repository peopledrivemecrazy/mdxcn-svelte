import { describe, expect, it } from 'vitest';

import { examples, html, text } from './render.js';

const modules = import.meta.glob<{ default: import('svelte').Component<any> }>(
	'../docs/examples/steps/*.svelte',
	{ eager: true }
);

const [install, runbook] = examples(modules);

describe('Steps', () => {
	it('numbers each step and colors now and next', () => {
		const markup = html(install!.component);
		expect(text(markup)).toContain('[ INSTALL ]');
		expect(text(markup)).toMatch(/01 Add the package bun add mdxcn-svelte/);
		expect(text(markup)).toMatch(/02 Import the stylesheet/);
		expect(text(markup)).toMatch(/03 Write Use it between paragraphs/);
		expect(markup.match(/data-reveal/g)?.length).toBe(3);
		expect(markup.match(/│/g)?.length).toBe(2);
		expect(markup).toMatch(/text-graph-accent[^>]*>\s*02/);
	});

	it('keeps plain bodies', () => {
		expect(text(html(runbook!.component))).toContain('Watch p95 Two minutes.');
	});

	it.each(examples(modules))('renders example $name', ({ component }) => {
		expect(text(html(component))).toMatch(/\[ \w+ \] .*01/);
	});
});
