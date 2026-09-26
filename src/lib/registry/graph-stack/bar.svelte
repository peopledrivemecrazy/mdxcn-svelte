<script lang="ts">
	import type { Snippet } from 'svelte';

	import { provideItems, registerItem } from '$lib/registry/graph-frame/index.js';

	import type { StackRow, StackSegment } from './types.js';

	/** `<Bar label="marketing"><Segment value={48} label="js" /></Bar>` inside `<GraphStack>`. */
	let { label, segments, children }: StackRow & { children?: Snippet } = $props();

	// Register with the graph first, then collect this bar's own <Segment> children.
	registerItem('Bar', () => ({ label, segments, nested: parts.list<StackSegment>('Segment') }));
	const parts = provideItems();
</script>

{@render children?.()}
