<script lang="ts">
	import {
		fillDelay,
		fraction,
		Graph,
		GraphBody,
		reveal,
		toneClass,
		trackMarks,
		type Glyphs,
		type GraphPalette
	} from '$lib/registry/graph-frame/index.js';
	import { cn } from '$lib/utils.js';

	export type GraphWaffleProps = {
		title: string;
		/** `0.73`, `"0.73"`, or `"73%"`. */
		value: number | string;
		cells?: number;
		columns?: number;
		caption?: string;
		glyphs?: Glyphs;
		palette?: GraphPalette;
		corner?: string;
		class?: string;
	};

	let {
		title,
		value,
		cells = 100,
		columns = 10,
		caption,
		glyphs,
		palette,
		corner,
		class: className
	}: GraphWaffleProps = $props();

	const clamped = $derived(Math.min(1, Math.max(0, fraction(value))));
	const filled = $derived(Math.round(clamped * cells));
	const rows = $derived(Math.ceil(cells / columns));
	const marks = $derived(trackMarks(glyphs, { empty: '░', rest: '░', fill: '█' }));
	const percent = $derived(Math.round(clamped * 100));
</script>

<Graph {title} class={className} {corner}>
	<GraphBody class="flex flex-col gap-4">
		<div
			aria-hidden="true"
			class="flex w-full flex-col gap-1 select-none"
			{@attach reveal({ y: 0, delayOf: (_, index) => fillDelay(false, index, 0.006) })}
		>
			{#each { length: rows }, row (row)}
				<div class="flex w-full">
					{#each { length: columns }, column (column)}
						{@const index = row * columns + column}
						{#if index >= cells}
							<span class="min-w-[1ch] flex-1"></span>
						{:else if index < filled}
							<span
								class={cn('min-w-[1ch] flex-1 text-center', toneClass(palette, 'primary'))}
								data-reveal>{marks.fill}</span
							>
						{:else}
							<span class="min-w-[1ch] flex-1 text-center text-graph-frame">{marks.empty}</span>
						{/if}
					{/each}
				</div>
			{/each}
		</div>
		<p class={cn('tabular-nums', toneClass(palette, 'primary'))}>{percent}%</p>
		{#if caption}
			<p class="text-graph-muted">{caption}</p>
		{/if}
		<span class="sr-only">{percent} percent{caption ? `. ${caption}` : ''}</span>
	</GraphBody>
</Graph>
