<script lang="ts">
	import type { Snippet } from 'svelte';

	import {
		clamp01,
		Graph,
		GraphBody,
		GraphTick,
		GraphTrack,
		numberOf,
		provideItems,
		reveal,
		toneClass,
		trackMarks,
		words,
		type Glyphs,
		type GraphPalette
	} from '$lib/registry/graph-frame/index.js';
	import { cn } from '$lib/utils.js';

	import type { GanttItem } from './types.js';

	export type GraphGanttProps = {
		title: string;
		/** Data form. Or write `<Span />` children. */
		items?: readonly GanttItem[];
		children?: Snippet;
		/** `["q1", "q2"]` or `"q1 q2"`. */
		ticks?: readonly string[] | string;
		columns?: number;
		stage?: string;
		progress?: number;
		glyphs?: Glyphs;
		palette?: GraphPalette;
		corner?: string;
		class?: string;
	};

	let {
		title,
		items: itemsProp,
		children,
		ticks: ticksProp,
		columns = 24,
		stage,
		progress,
		glyphs,
		palette,
		corner,
		class: className
	}: GraphGanttProps = $props();

	const spans = provideItems();

	const items = $derived(
		(itemsProp ?? spans.list<GanttItem>('Span')).map((entry) => ({
			label: entry.label ?? '',
			start: numberOf(entry.start),
			end: numberOf(entry.end),
			accent: entry.accent,
			complete: entry.complete == null ? undefined : numberOf(entry.complete)
		}))
	);
	const ticks = $derived(words(ticksProp));
	const playhead = $derived(
		progress == null ? null : Math.round(clamp01(progress) * (columns - 1))
	);
	const marks = $derived(trackMarks(glyphs));

	function describe(entry: (typeof items)[number]) {
		const complete =
			entry.complete != null ? `, ${Math.round(entry.complete * 100)}% complete` : '';
		return `${entry.label} from ${Math.round(entry.start * 100)}% to ${Math.round(entry.end * 100)}%${complete}`;
	}
</script>

{@render children?.()}

<Graph {title} class={className} {corner}>
	<GraphBody class="flex flex-col gap-4">
		{#if playhead != null}
			<div class="grid grid-cols-[minmax(0,7rem)_minmax(0,1fr)] gap-x-2 sm:gap-x-4">
				<span></span>
				<GraphTrack>
					{#each { length: columns }, index (index)}
						<GraphTick
							class={index === playhead ? toneClass(palette, 'primary') : 'text-transparent'}
						>
							▾
						</GraphTick>
					{/each}
				</GraphTrack>
			</div>
		{/if}
		<ul class="flex flex-col gap-2" role="list" {@attach reveal({ stagger: 0.05, amount: 0.4 })}>
			{#each items as entry, entryIndex (entryIndex)}
				{@const start = Math.round(clamp01(entry.start) * columns)}
				{@const end = Math.max(start + 1, Math.round(clamp01(entry.end) * columns))}
				{@const done = Math.round(clamp01(entry.complete ?? 1) * (end - start))}
				{@const focused = stage ? entry.label === stage : Boolean(entry.accent)}
				<li
					aria-label={describe(entry)}
					class="grid grid-cols-[minmax(0,7rem)_minmax(0,1fr)] items-center gap-x-2 sm:gap-x-4"
					data-reveal
				>
					<span class={cn('truncate', focused ? toneClass(palette, 'primary') : 'text-foreground')}
						>{entry.label}</span
					>
					<GraphTrack>
						{#each { length: columns }, index (index)}
							{@const inBar = index >= start && index < end}
							{@const filled = inBar && index < start + done}
							{@const rest = inBar && !filled}
							<GraphTick
								class={filled
									? focused
										? toneClass(palette, 'primary')
										: 'text-foreground'
									: rest
										? toneClass(palette, 'secondary')
										: toneClass(palette, 'empty')}
							>
								{filled ? marks.fill : rest ? marks.rest : marks.empty}
							</GraphTick>
						{/each}
					</GraphTrack>
				</li>
			{/each}
		</ul>
		{#if ticks.length > 0}
			<div class="grid grid-cols-[minmax(0,7rem)_minmax(0,1fr)] gap-x-2 sm:gap-x-4">
				<span></span>
				<div class="flex justify-between text-graph-muted">
					{#each ticks as tick, index (index)}
						<span>{tick}</span>
					{/each}
				</div>
			</div>
		{/if}
	</GraphBody>
</Graph>
