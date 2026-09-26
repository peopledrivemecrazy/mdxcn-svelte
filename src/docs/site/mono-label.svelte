<script lang="ts">
	import type { Snippet } from 'svelte';

	import { cn } from '$lib/utils.js';

	let { class: className, children }: { class?: string; children: Snippet } = $props();
</script>

<p class={cn('font-mono tracking-wide text-graph-accent', className)}>{@render children()}</p>
