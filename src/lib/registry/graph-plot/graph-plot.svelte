<script lang="ts">
	import {
		clamp01,
		fillDelay,
		Graph,
		GraphBody,
		GraphRule,
		numbers,
		reveal,
		toneClass,
		trackMarks,
		words,
		type Glyphs,
		type GraphPalette
	} from '$lib/registry/graph-frame/index.js';
	import { cn } from '$lib/utils.js';

	export type GraphPlotProps = {
		title: string;
		/** `[2, 3, 4]` or `"2 3 4"`. One value per column. */
		data: readonly number[] | string;
		/** `["jan", "dec"]` or `"jan dec"`. First and last sit under the axis. */
		labels?: readonly string[] | string;
		height?: number;
		variant?: 'line' | 'area';
		progress?: number;
		glyphs?: Glyphs;
		palette?: GraphPalette;
		corner?: string;
		class?: string;
	};

	let {
		title,
		data: dataProp,
		labels: labelsProp,
		height = 7,
		variant = 'area',
		progress = 1,
		glyphs,
		palette,
		corner,
		class: className
	}: GraphPlotProps = $props();

	function formatTick(value: number) {
		if (Number.isInteger(value)) {
			return String(value);
		}

		return value.toFixed(1);
	}

	const data = $derived(numbers(dataProp));
	const labels = $derived(words(labelsProp));
	const max = $derived(Math.max(...data, 0));
	const min = $derived(Math.min(0, ...data));
	const range = $derived(max - min || 1);
	const start = $derived(labels[0]);
	const end = $derived(labels[labels.length - 1]);
	const yLabel = $derived(formatTick(max));
	const revealed = $derived(Math.round(clamp01(progress) * data.length));
	const lastLive = $derived(Math.max(0, revealed - 1));
	const marks = $derived(trackMarks(glyphs));
</script>

<Graph {title} class={className} {corner}>
	<GraphBody class="flex flex-col gap-3">
		<div class="flex gap-3">
			<div
				class="flex w-[4ch] shrink-0 flex-col justify-between py-px text-right text-graph-muted tabular-nums"
				style="height: {height}em"
			>
				<span>{yLabel}</span>
				<span>{formatTick(min)}</span>
			</div>
			<div
				aria-hidden="true"
				class="flex min-w-0 flex-1 items-end select-none"
				style="height: {height}em"
				{@attach reveal({
					y: 0,
					delayOf: (element) => fillDelay(false, Number(element.dataset.column ?? 0))
				})}
			>
				{#each data as value, column (column)}
					{@const level = Math.round(((value - min) / range) * (height - 1))}
					{@const shown = column < revealed}
					{@const live = column === lastLive && shown}
					<span class="flex h-full min-w-[1ch] flex-1 flex-col justify-end">
						{#each { length: height }, row (row)}
							{@const fromBottom = height - 1 - row}
							{@const isCap = shown && fromBottom === level}
							{@const isFill = shown && variant === 'area' && fromBottom < level}
							{@const glyph = isCap ? marks.fill : isFill ? marks.rest : ' '}
							{@const tone = isCap
								? live
									? toneClass(palette, 'primary')
									: 'text-foreground'
								: isFill
									? toneClass(palette, 'secondary')
									: 'text-transparent'}
							{#if glyph === ' '}
								<span class={cn('h-[1em] w-full text-center', tone)}>{glyph}</span>
							{:else}
								<span
									class={cn('h-[1em] w-full text-center', tone)}
									data-reveal
									data-column={column}>{glyph}</span
								>
							{/if}
						{/each}
					</span>
				{/each}
			</div>
		</div>
		{#if start || end}
			<div class="flex gap-3">
				<span class="invisible w-[4ch] shrink-0 tabular-nums">{yLabel}</span>
				<GraphRule class="flex-1" />
			</div>
			<div class="flex gap-3">
				<span class="invisible w-[4ch] shrink-0 tabular-nums">{yLabel}</span>
				<div class="flex flex-1 justify-between text-graph-muted">
					<span>{start}</span>
					{#if end && end !== start}
						<span>{end}</span>
					{/if}
				</div>
			</div>
		{/if}
		<span class="sr-only">
			{variant} plot, {data.length} points, min {formatTick(min)}, max {formatTick(max)}
		</span>
	</GraphBody>
</Graph>
