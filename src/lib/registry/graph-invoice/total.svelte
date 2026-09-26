<script lang="ts">
	import { registerItem } from '$lib/registry/graph-frame/index.js';

	import type { InvoiceTotal } from './types.js';

	/** A row under the items. `accent` marks the amount due. */
	let { label, value, accent }: InvoiceTotal = $props();

	registerItem('Total', () => ({ label, value, accent }));
</script>
