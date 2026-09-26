<script lang="ts">
	import type { Snippet } from 'svelte';

	import {
		Graph,
		GraphBody,
		GraphRule,
		GraphTick,
		GraphTrack,
		provideItems,
		reveal,
		toneClass,
		trackMarks,
		type Glyphs,
		type GraphPalette
	} from '$lib/registry/graph-frame/index.js';
	import { cn } from '$lib/utils.js';

	import { formatValue, segmentsOf, type WaterfallItem } from './waterfall.js';

	export type GraphWaterfallProps = {
		title: string;
		/** Data form. Or write `<Delta />` children. */
		items?: WaterfallItem[];
		children?: Snippet;
		ticks?: number;
		glyphs?: Glyphs;
		palette?: GraphPalette;
		corner?: string;
		class?: string;
	};

	let {
		title,
		items: itemsProp,
		children,
		ticks = 24,
		glyphs,
		palette,
		corner,
		class: className
	}: GraphWaterfallProps = $props();

	const registered = provideItems();

	const marks = $derived(trackMarks(glyphs));
	const segments = $derived(segmentsOf(itemsProp ?? registered.list<WaterfallItem>('Delta')));
	const low = $derived(
		Math.min(0, ...segments.map((segment) => Math.min(segment.from, segment.to)))
	);
	const high = $derived(
		Math.max(1, ...segments.map((segment) => Math.max(segment.from, segment.to)))
	);
	const span = $derived(high - low || 1);

	function column(value: number) {
		return Math.round(((value - low) / span) * ticks);
	}
</script>

{@render children?.()}

<Graph {title} class={className} {corner}>
	<GraphBody class="flex flex-col gap-3">
		<ul
			class="flex w-full flex-col gap-2"
			role="list"
			{@attach reveal({ stagger: 0.05, amount: 0.4 })}
		>
			{#each segments as segment, index (index)}
				{@const start = Math.min(column(segment.from), column(segment.to))}
				{@const end = Math.max(column(segment.from), column(segment.to), start + 1)}
				<li class="flex flex-col gap-2">
					{#if segment.kind === 'end' && index > 0}
						<GraphRule />
					{/if}
					<div
						class="grid grid-cols-[minmax(0,7rem)_minmax(0,1fr)_minmax(0,5.5rem)] items-center gap-x-2 sm:gap-x-4"
						data-reveal
					>
						<span class="truncate text-foreground">{segment.label}</span>
						<GraphTrack>
							{#each { length: ticks }, cell (cell)}
								{@const filled = cell >= start && cell < end}
								<GraphTick
									class={!filled
										? toneClass(palette, 'empty')
										: segment.kind === 'out'
											? toneClass(palette, 'secondary')
											: segment.kind === 'start'
												? 'text-foreground'
												: toneClass(palette, 'primary')}
								>
									{filled ? marks.fill : marks.empty}
								</GraphTick>
							{/each}
						</GraphTrack>
						<span
							class={cn(
								'text-right tabular-nums',
								segment.kind === 'out' && toneClass(palette, 'secondary'),
								segment.kind === 'end' && toneClass(palette, 'primary'),
								(segment.kind === 'start' || segment.kind === 'in') && 'text-foreground'
							)}>{formatValue(segment, segment.kind)}</span
						>
					</div>
				</li>
			{/each}
		</ul>
		<span class="sr-only">
			{segments
				.map((segment) => `${segment.label} ${formatValue(segment, segment.kind)}`)
				.join(', ')}
		</span>
	</GraphBody>
</Graph>
