<script lang="ts">
	import { registerItem } from '$lib/registry/graph-frame/index.js';

	import type { BarSeries } from './types.js';

	/** `<Series label="before" values="2 4 3 5 2" />`. The first is from, the second is to. */
	let { label, values, size }: BarSeries = $props();

	registerItem('Series', () => ({ label, values, size }));
</script>
