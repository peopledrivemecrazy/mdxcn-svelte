<script lang="ts">
	import { registerItem } from '$lib/registry/graph-frame/index.js';

	import type { CellGrid } from './types.js';

	/** `<Grid label="fragments" cells="1 0 1 0 0 / 0 1 0 1 0" />`. */
	let { label, cells }: CellGrid = $props();

	registerItem('Grid', () => ({ label, cells }));
</script>
