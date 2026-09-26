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
