import { flushSync } from 'svelte';
import { render } from 'vitest-browser-svelte';
import { describe, expect, it } from 'vitest';

import TableItems from './fixtures/table-items.svelte';

describe('client render', () => {
	it('draws rows registered by item children', async () => {
		const screen = await render(TableItems);
		flushSync();
		await expect.element(screen.getByText('12,400')).toBeInTheDocument();
		await expect.element(screen.getByText('13,300')).toBeInTheDocument();
		expect(screen.container.querySelectorAll('tbody tr').length).toBe(2);
	});
});

describe('comark in the browser', () => {
	it('renders wrapped graphs on the client', async () => {
		const { parseMarkdown } = await import('comark');
		const { default: Probe } = await import('./fixtures/comark.svelte');
		const doc = await parseMarkdown('::graph-meter{title="shipped" value="0.5" ticks="10"}\n::');
		const screen = await render(Probe, { doc: doc as never });
		await expect.element(screen.getByText('50%')).toBeInTheDocument();
	});
});
