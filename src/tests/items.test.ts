import { render } from 'svelte/server';
import { describe, expect, it } from 'vitest';

import TableItems from './fixtures/table-items.svelte';

describe('server render', () => {
	it('reads item children before drawing the table', () => {
		const body = render(TableItems).body.replace(/<!--.*?-->/g, '');
		expect(body).toContain('[ usage');
		expect(body).toContain('12,400');
		expect(body).toContain('13,300');
		expect(body.indexOf('Name')).toBeLessThan(body.indexOf('docs'));
	});
});
