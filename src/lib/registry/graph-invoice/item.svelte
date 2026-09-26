<script lang="ts">
	import { registerItem } from '$lib/registry/graph-frame/index.js';

	import type { InvoiceItem } from './types.js';

	/** One line item: `<Item description="Design system" qty="1" rate="4,200" amount="4,200" />`. */
	let { description, qty, rate, amount }: InvoiceItem = $props();

	registerItem('Item', () => ({ description, qty, rate, amount }));
</script>
