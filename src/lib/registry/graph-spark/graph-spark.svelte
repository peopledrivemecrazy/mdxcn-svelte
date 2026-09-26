<script lang="ts">
	import {
		fillDelay,
		Graph,
		GraphBody,
		GraphTick,
		GraphTrack,
		numbers,
		resolveGlyphs,
		reveal,
		seriesDim,
		toneClass,
		type Glyphs,
		type GraphPalette
	} from '$lib/registry/graph-frame/index.js';

	const SPARK_DEFAULT = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];

	export type GraphSparkProps = {
		title: string;
		/** `[2, 3, 4]` or `"2 3 4"`. Scaled to the max. */
		data: readonly number[] | string;
		caption?: string;
		glyphs?: Glyphs;
		palette?: GraphPalette;
		corner?: string;
		class?: string;
	};

	let {
		title,
		data: dataProp,
		caption,
		glyphs,
		palette,
		corner,
		class: className
	}: GraphSparkProps = $props();

	const data = $derived(numbers(dataProp));
	const max = $derived(Math.max(...data, 1));
	const last = $derived(data.length - 1);
	const set = $derived(glyphs == null ? SPARK_DEFAULT : resolveGlyphs(glyphs));
	const points = $derived(
		data.map((value) => {
			const index = Math.round((value / max) * (set.length - 1));
			return set[index] ?? set[0] ?? '▁';
		})
	);
</script>

<Graph {title} class={className} {corner}>
	<GraphBody class="flex flex-col items-center gap-4">
		<GraphTrack
			class="justify-center gap-0.5"
			{@attach reveal({ y: 0, delayOf: (_, index) => fillDelay(false, index) })}
		>
			{#each points as glyph, index (`${glyph}-${index}`)}
				{@const live = index === last}
				<GraphTick class="flex-none" style={seriesDim(palette, live)}>
					<span
						class={live ? toneClass(palette, 'primary') : toneClass(palette, 'secondary')}
						data-reveal>{glyph}</span
					>
				</GraphTick>
			{/each}
		</GraphTrack>
		{#if caption}
			<p class="text-graph-muted">{caption}</p>
		{/if}
		<span class="sr-only">Sparkline with {data.length} points{caption ? `. ${caption}` : ''}</span>
	</GraphBody>
</Graph>
