<script lang="ts">
	import { registerItem } from '$lib/registry/graph-frame/index.js';

	import type { WaterfallKind } from './waterfall.js';

	/**
	 * One step: `<Delta label="Refunds" value={-6} />`. First and last rows are
	 * start and end unless `kind` says otherwise.
	 */
	let {
		label,
		value,
		display,
		kind
	}: { label?: string; value: number | string; display?: string; kind?: WaterfallKind } = $props();

	registerItem('Delta', () => ({ label, value, display, kind }));
</script>
