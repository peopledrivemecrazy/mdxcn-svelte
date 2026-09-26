import { parseMarkdown } from 'comark';
import { describe, expect, it } from 'vitest';

import { graphTags } from '$lib/registry/graph-comark/index.js';

import Page from '../routes/docs/comark/+page.svelte';
import { source } from '../routes/docs/comark/source.js';
import { html, text } from './render.js';

describe('graph-comark', () => {
	it('maps every graph tag plus row', () => {
		expect(graphTags).toContain('row');
		expect(graphTags.length).toBe(33);
	});

	it('server-renders ::graph-* blocks from a parsed document', async () => {
		const out = text(html(Page, { data: { doc: await parseMarkdown(source) } }));
		expect(out).toContain('[ shipped ]');
		expect(out).toContain('67%');
		expect(out).toContain('13,300');
	});

	it('holds a pending frame until required props arrive', async () => {
		const { default: Probe } = await import('./fixtures/comark.svelte');
		const out = text(html(Probe, { doc: await parseMarkdown('::graph-table{title="wait"}\n::') }));
		expect(out).toContain('[ wait ]');
		expect(out).toContain('· · ·');
	});
});
