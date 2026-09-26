<script lang="ts">
	import type { Snippet } from 'svelte';

	import {
		fillDelay,
		Graph,
		GraphBody,
		isMonoPalette,
		provideItems,
		reveal,
		seriesClass,
		trackMarks,
		type Glyphs,
		type GraphPalette
	} from '$lib/registry/graph-frame/index.js';
	import { cn } from '$lib/utils.js';

	import { gridCells, type CellGrid } from './types.js';

	export type GraphCellsProps = {
		title: string;
		/** Data form. Or write `<Grid>` children. */
		items?: readonly CellGrid[];
		children?: Snippet;
		glyphs?: Glyphs;
		palette?: GraphPalette;
		corner?: string;
		class?: string;
	};

	let {
		title,
		items: itemsProp,
		children,
		glyphs,
		palette,
		corner,
		class: className
	}: GraphCellsProps = $props();

	const registered = provideItems();

	const grids = $derived(
		(itemsProp ?? registered.list<CellGrid>('Grid')).map((item) => ({
			label: item.label,
			cells: gridCells(item.cells)
		}))
	);
	const marks = $derived(trackMarks(glyphs, { empty: '·', rest: '░', fill: '█' }));
</script>

{@render children?.()}

<Graph {title} class={className} {corner}>
	<GraphBody>
		<div
			class="@container flex flex-col items-center gap-10 @min-[28rem]:flex-row @min-[28rem]:justify-center @min-[28rem]:gap-12"
			{@attach reveal({ y: 0, delayOf: (element) => Number(element.dataset.delay ?? 0) })}
		>
			{#each grids as item, itemIndex (itemIndex)}
				{@const tone = isMonoPalette(palette)
					? 'text-graph-accent'
					: seriesClass(palette, itemIndex)}
				<div class="flex flex-col items-center gap-4">
					<div aria-hidden="true" class="flex flex-col gap-1">
						{#each item.cells as row, rowIndex (rowIndex)}
							<div class="flex gap-1">
								{#each row as cell, cellIndex (cellIndex)}
									{#if cell === 1}
										<span
											class={cn('w-[1ch] text-center select-none', tone)}
											data-reveal
											data-delay={fillDelay(false, itemIndex * 8 + rowIndex * 5 + cellIndex)}
											>{marks.fill}</span
										>
									{:else}
										<span class="w-[1ch] text-center text-graph-frame select-none"
											>{marks.empty}</span
										>
									{/if}
								{/each}
							</div>
						{/each}
					</div>
					<p class={isMonoPalette(palette) ? 'text-graph-muted' : seriesClass(palette, itemIndex)}>
						{item.label}
					</p>
				</div>
			{/each}
		</div>
	</GraphBody>
</Graph>
