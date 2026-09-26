<script lang="ts" module>
	export type Corner = 'tl' | 'tr' | 'bl' | 'br';
</script>

<script lang="ts">
	import { cn } from '$lib/utils.js';

	let {
		corners = ['tl', 'tr', 'bl', 'br'],
		tone = 'rail',
		class: className
	}: { corners?: readonly Corner[]; tone?: 'rail' | 'frame'; class?: string } = $props();

	const place: Record<Corner, string> = {
		tl: 'top-0 left-0 -translate-x-1/2 -translate-y-1/2',
		tr: 'top-0 right-0 translate-x-1/2 -translate-y-1/2',
		bl: 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2',
		br: 'right-0 bottom-0 translate-x-1/2 translate-y-1/2'
	};
</script>

{#each corners as corner (corner)}
	<span
		aria-hidden="true"
		class={cn(
			'pointer-events-none absolute z-20 flex size-4 items-center justify-center bg-background select-none',
			tone === 'frame' ? 'text-graph-frame' : 'text-site-rail',
			place[corner],
			className
		)}
	>
		<svg viewBox="0 0 16 16" class="size-4" fill="none" stroke="currentColor" stroke-width="1.5">
			<path d="M8 3v10M3 8h10" />
		</svg>
	</span>
{/each}
