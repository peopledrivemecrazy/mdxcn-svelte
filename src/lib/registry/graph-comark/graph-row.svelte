<script lang="ts">
	import type { Snippet } from 'svelte';

	import { cn } from '$lib/utils.js';

	/** Nested Comark blocks. `::row{cols=2}` puts two figures on one line. One column on small screens. */
	let {
		cols = 2,
		class: className,
		children
	}: { cols?: number; class?: string; children?: Snippet } = $props();
</script>

<div
	class={cn(
		'grid gap-4',
		cols <= 1 && 'grid-cols-1',
		cols === 2 && 'grid-cols-1 sm:grid-cols-2',
		cols >= 3 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
		className
	)}
>
	{@render children?.()}
</div>
