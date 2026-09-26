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
	import { cn } from '$lib/utils.js';

	const SPARK_DEFAULT = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];

	export type GraphKpiProps = {
		title: string;
		value: string;
		label: string;
		hint?: string;
		/** `[4, 5, 6]` or `"4 5 6"`. Sparkline under the number. */
		data: readonly number[] | string;
		glyphs?: Glyphs;
		palette?: GraphPalette;
		corner?: string;
		class?: string;
	};

	let {
		title,
		value,
		label,
		hint,
		data: dataProp,
		glyphs,
		palette,
		corner,
		class: className
	}: GraphKpiProps = $props();

	const points = $derived.by(() => {
		const data = numbers(dataProp);
		const max = Math.max(...data, 1);
		const set = glyphs == null ? SPARK_DEFAULT : resolveGlyphs(glyphs);
		return data.map((entry) => {
			const index = Math.round((entry / max) * (set.length - 1));
			return set[index] ?? set[0] ?? '▁';
		});
	});
</script>

<Graph {title} class={className} {corner}>
	<GraphBody class="flex flex-col gap-4">
		<div class="flex flex-col gap-2" data-reveal {@attach reveal({ amount: 0.5 })}>
			<p
				class={cn(
					'text-3xl tracking-tight tabular-nums sm:text-4xl',
					toneClass(palette, 'primary')
				)}
			>
				{value}
			</p>
			<div class="flex items-baseline gap-3">
				<p class="text-graph-muted">{label}</p>
				{#if hint}
					<p class="text-graph-muted tabular-nums">{hint}</p>
				{/if}
			</div>
		</div>
		{#if points.length > 0}
			<GraphTrack
				class="justify-start gap-0.5"
				{@attach reveal({ y: 0, delayOf: (_, index) => fillDelay(false, index) })}
			>
				{#each points as glyph, index (index)}
					{@const live = index === points.length - 1}
					<GraphTick class="flex-none" data-reveal>
						<span
							class={toneClass(palette, live ? 'primary' : 'secondary')}
							style={seriesDim(palette, live)}>{glyph}</span
						>
					</GraphTick>
				{/each}
			</GraphTrack>
		{/if}
		<span class="sr-only">{value} {label}{hint ? `. ${hint}` : ''}</span>
	</GraphBody>
</Graph>
