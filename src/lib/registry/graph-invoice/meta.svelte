<script lang="ts">
	import { registerItem } from '$lib/registry/graph-frame/index.js';

	import type { InvoiceMeta } from './types.js';

	/** `<Meta label="Due" value="Apr 11, 2026" />`. */
	let { label, value }: InvoiceMeta = $props();

	registerItem('Meta', () => ({ label, value }));
</script>
