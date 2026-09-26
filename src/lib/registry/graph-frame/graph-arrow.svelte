<script lang="ts">
	import { cn } from '$lib/utils.js';

	let {
		accent = false,
		stretch = false,
		class: className
	}: { accent?: boolean; stretch?: boolean; class?: string } = $props();
</script>

<div
	aria-hidden="true"
	class={cn(
		'flex min-w-6 items-center gap-1',
		stretch && 'min-w-10 flex-1',
		accent ? 'text-graph-accent' : 'text-graph-frame',
		className
	)}
>
	{#if stretch}
		<span class="h-px min-w-6 flex-1 border-t border-dashed border-current"></span>
	{:else}
		<span>- - -</span>
	{/if}
	<span class="shrink-0">▶</span>
</div>
