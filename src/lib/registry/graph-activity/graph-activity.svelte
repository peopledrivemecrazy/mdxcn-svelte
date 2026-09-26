<script lang="ts">
	import {
		Graph,
		GraphBody,
		intensityClass,
		intensityGlyph,
		intensityLevel,
		resolveGlyphs,
		reveal,
		type Glyphs,
		type GraphPalette
	} from '$lib/registry/graph-frame/index.js';
	import { cn } from '$lib/utils.js';

	import { buildWeeks, dayLabels, monthLabels, type ActivityDay } from './activity-weeks.js';
	import IntensityScale from './intensity-scale.svelte';

	export type GraphActivityProps = {
		title: string;
		days: ActivityDay[];
		weekStartsOn?: 0 | 1;
		max?: number;
		legend?: boolean;
		caption?: string | false;
		glyphs?: Glyphs;
		palette?: GraphPalette;
		corner?: string;
		class?: string;
	};

	let {
		title,
		days,
		weekStartsOn = 0,
		max,
		legend = true,
		caption,
		glyphs,
		palette,
		corner,
		class: className
	}: GraphActivityProps = $props();

	const weeks = $derived(buildWeeks(days, weekStartsOn));
	const months = $derived(monthLabels(weeks));
	const labels = $derived(dayLabels(weekStartsOn));
	const peak = $derived(max ?? Math.max(0, ...days.map((day) => day.count), 0));
	const total = $derived(days.reduce((sum, day) => sum + day.count, 0));
	const summary = $derived(`${total.toLocaleString('en-US')} contributions`);
	const set = $derived(resolveGlyphs(glyphs));
	const quiet = $derived(set[0] ?? '·');
</script>

<Graph {title} class={className} {corner}>
	<GraphBody class="flex flex-col gap-4">
		<div class="scrollbar-graph overflow-x-auto">
			<div
				class="flex w-full flex-col gap-1 pr-[2ch]"
				style:min-width={`max(100%, ${weeks.length + 4}ch)`}
			>
				<div class="flex h-[1.25em] w-full">
					<span class="w-[2ch] shrink-0"></span>
					{#each months as month, index (index)}
						<span class="relative min-w-[1ch] flex-1">
							{#if month}
								<span class="absolute bottom-0 left-0 whitespace-nowrap text-graph-muted">
									{month}
								</span>
							{/if}
						</span>
					{/each}
				</div>
				<div class="flex w-full">
					<div class="flex w-[2ch] shrink-0 flex-col">
						{#each labels as label, index (index)}
							<span class="flex h-[1.15em] items-center text-graph-muted">{label}</span>
						{/each}
					</div>
					<div class="flex flex-1" {@attach reveal({ stagger: 0.01, amount: 0.2 })}>
						{#each weeks as week, weekIndex (week[0]?.date ?? weekIndex)}
							<div
								class="flex min-w-[1ch] flex-1 flex-col will-change-[transform,opacity]"
								data-reveal
							>
								{#each week as cell (cell.date)}
									{@const level = cell.inRange ? intensityLevel(cell.count, peak) : 0}
									<span
										aria-hidden="true"
										class={cn(
											'flex h-[1.15em] w-full items-center justify-center leading-none select-none',
											cell.inRange ? intensityClass(level, palette) : 'text-transparent'
										)}
									>
										{cell.inRange ? intensityGlyph(level, set) : quiet}
									</span>
								{/each}
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
		{#if caption !== false || legend}
			<div
				class={cn(
					'flex flex-wrap items-center gap-3',
					caption === false ? 'justify-end' : 'justify-between'
				)}
			>
				{#if caption !== false}
					<p class="text-graph-muted tabular-nums">{caption ?? summary}</p>
				{/if}
				{#if legend}
					<IntensityScale glyphs={set} {palette} />
				{/if}
			</div>
		{/if}
		<span class="sr-only">
			{total} contributions across {days.length} days{caption ? `. ${caption}` : ''}
		</span>
	</GraphBody>
</Graph>
