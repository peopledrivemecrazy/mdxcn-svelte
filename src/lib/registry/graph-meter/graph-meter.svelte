<script lang="ts">
	import {
		fillDelay,
		fraction,
		Graph,
		GraphBody,
		GraphTick,
		GraphTrack,
		reveal,
		toneClass,
		trackMarks,
		type Glyphs,
		type GraphPalette
	} from '$lib/registry/graph-frame/index.js';
	import { cn } from '$lib/utils.js';

	export type GraphMeterProps = {
		title: string;
		/** `0.67`, `"0.67"`, or `"67%"`. */
		value: number | string;
		ticks?: number;
		caption?: string;
		glyphs?: Glyphs;
		palette?: GraphPalette;
		corner?: string;
		class?: string;
	};

	let {
		title,
		value,
		ticks = 14,
		caption,
		glyphs,
		palette,
		corner,
		class: className
	}: GraphMeterProps = $props();

	const clamped = $derived(Math.min(1, Math.max(0, fraction(value))));
	const filled = $derived(Math.round(clamped * ticks));
	const marks = $derived(trackMarks(glyphs, { empty: '-', rest: '=', fill: '=' }));
	const percent = $derived(Math.round(clamped * 100));
</script>

<Graph {title} class={className} {corner}>
	<GraphBody class="flex flex-col gap-4">
		<p class="flex w-full items-center gap-3 tabular-nums">
			<span aria-hidden="true" class="text-graph-frame select-none">[</span>
			<GraphTrack {@attach reveal({ y: 0, delayOf: (_, index) => fillDelay(false, index) })}>
				{#each { length: ticks }, index (index)}
					{@const isFilled = index < filled}
					<GraphTick class={isFilled ? toneClass(palette, 'primary') : 'text-graph-frame'}>
						{#if isFilled}
							<span class="block w-full" data-reveal>{marks.fill}</span>
						{:else}
							<span class="block w-full">{marks.empty}</span>
						{/if}
					</GraphTick>
				{/each}
			</GraphTrack>
			<span aria-hidden="true" class="text-graph-frame select-none">]</span>
			<span class={cn('w-[4ch] shrink-0 text-right', toneClass(palette, 'primary'))}
				>{percent}%</span
			>
		</p>
		{#if caption}
			<p class="text-graph-muted">{caption}</p>
		{/if}
		<span class="sr-only">{percent} percent{caption ? ` ${caption}` : ''}</span>
	</GraphBody>
</Graph>
