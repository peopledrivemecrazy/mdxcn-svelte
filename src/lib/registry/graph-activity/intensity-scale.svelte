<script lang="ts">
	import { intensityClass, type GraphPalette } from '$lib/registry/graph-frame/index.js';
	import { cn } from '$lib/utils.js';

	let { glyphs, palette }: { glyphs: readonly string[]; palette?: GraphPalette } = $props();
</script>

<p class="flex items-center gap-2 text-graph-muted">
	<span>Less</span>
	<span aria-hidden="true" class="flex select-none">
		{#each glyphs as glyph, index (`${glyph}-${index}`)}
			<span
				class={cn(
					'w-[1ch] text-center',
					intensityClass(Math.round((index / Math.max(glyphs.length - 1, 1)) * 4), palette)
				)}
			>
				{glyph}
			</span>
		{/each}
	</span>
	<span>More</span>
</p>
