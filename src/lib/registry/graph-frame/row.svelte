<script lang="ts">
	import { registerItem } from './graph-items.svelte.js';

	/**
	 * One body row. Table: `cells="docs | 12,400"`. Labeled graphs (matrix,
	 * compare, heatmap) also take a `label`.
	 */
	let { label, cells }: { label?: string; cells?: string | readonly (string | number)[] } =
		$props();

	registerItem('Row', () => ({ label, cells }));
</script>
