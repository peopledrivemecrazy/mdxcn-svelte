<script lang="ts">
	import { registerItem } from './graph-items.svelte.js';

	/**
	 * Totals row under the rule.
	 */
	let { label, cells }: { label?: string; cells?: string | readonly (string | number)[] } =
		$props();

	registerItem('Foot', () => ({ label, cells }));
</script>
