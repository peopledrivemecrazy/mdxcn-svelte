<script lang="ts">
	import { registerItem } from '$lib/registry/graph-frame/index.js';

	import type { InvoiceParty } from './types.js';

	/** `<From name="Acme Studio" lines="12 Main St" />`. */
	let { name, lines }: InvoiceParty = $props();

	registerItem('From', () => ({ name, lines }));
</script>
