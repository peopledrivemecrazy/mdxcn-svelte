<script lang="ts">
	import { registerItem } from './graph-items.svelte.js';
	import type { MdAlign } from './graph-data.js';

	/** Column headings: `cells="Name | Value"` or an array. */
	let { cells, align }: { cells?: string | readonly string[]; align?: string | readonly MdAlign[] } =
		$props();

	registerItem('Head', () => ({ cells, align }));
</script>
