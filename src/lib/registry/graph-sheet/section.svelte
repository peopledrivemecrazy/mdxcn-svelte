<script lang="ts">
	import type { Snippet } from 'svelte';

	import { provideItems, registerItem } from '$lib/registry/graph-frame/index.js';

	import type { SheetCells } from './types.js';

	/**
	 * `<Section title="Scope"><Row cells="CLI copies files | priya | done" /></Section>`.
	 * Rows come from the `rows` prop or from nested `<Row>` children.
	 */
	let {
		title,
		rows,
		children
	}: { title: string; rows?: readonly SheetCells[]; children?: Snippet } = $props();

	registerItem('Section', () => ({
		title,
		rows: rows ?? items.list<{ cells?: SheetCells }>('Row').map((row) => row.cells ?? [])
	}));

	const items = provideItems();
</script>

{@render children?.()}
