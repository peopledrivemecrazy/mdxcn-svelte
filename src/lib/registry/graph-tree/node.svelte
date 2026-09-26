<script lang="ts">
	import type { Snippet } from 'svelte';

	import { provideItems, registerItem } from '$lib/registry/graph-frame/index.js';

	import type { TreeNode } from './types.js';

	/** `<Node label="platform"><Node label="api" meta="priya" /></Node>` inside `<GraphTree>`. */
	let {
		label,
		meta,
		accent,
		children
	}: { label: string; meta?: string; accent?: boolean; children?: Snippet } = $props();

	// Register with the parent first: provideItems() below shadows its context.
	registerItem('Node', () => {
		const kids = items.list<TreeNode>('Node');
		return { label, meta, accent, children: kids.length > 0 ? kids : undefined };
	});

	const items = provideItems();
</script>

{@render children?.()}
