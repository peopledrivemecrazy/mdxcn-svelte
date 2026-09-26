<script lang="ts">
	import type { Snippet } from 'svelte';

	import {
		cellsOf,
		Graph,
		GraphBody,
		intensityClass,
		intensityGlyph,
		intensityLevel,
		numbers,
		provideItems,
		resolveGlyphs,
		reveal,
		words,
		type Glyphs,
		type GraphPalette
	} from '$lib/registry/graph-frame/index.js';
	import { cn } from '$lib/utils.js';

	import IntensityScale from './intensity-scale.svelte';

	export type HeatRow = {
		label: string;
		/** `[0, 1, 4]` or `"0 1 4"`. */
		values: readonly number[] | string;
	};

	export type GraphHeatmapProps = {
		title: string;
		/** Data form. Or `"0 4 8 12"`. Or write `<Head cells="0 4 8 12" />`. */
		columns?: string[] | string;
		/** Data form. Or write `<Row label="Mon" cells="0 1 4 8" />`. */
		rows?: HeatRow[];
		children?: Snippet;
		max?: number;
		legend?: boolean;
		caption?: string;
		glyphs?: Glyphs;
		palette?: GraphPalette;
		corner?: string;
		class?: string;
	};

	let {
		title,
		columns: columnsProp,
		rows: rowsProp,
		children,
		max,
		legend = true,
		caption,
		glyphs,
		palette,
		corner,
		class: className
	}: GraphHeatmapProps = $props();

	const items = provideItems();

	type Line = { label?: string; cells?: string | readonly (string | number)[] };

	const columns = $derived(
		columnsProp == null ? cellsOf(items.list<Line>('Head')[0]?.cells) : words(columnsProp)
	);
	const rows = $derived(
		(
			rowsProp ??
			items.list<Line>('Row').map((row) => ({
				label: row.label ?? '',
				values: cellsOf(row.cells).join(' ')
			}))
		).map((row) => ({ label: row.label ?? '', values: numbers(row.values) }))
	);
	const peak = $derived(max ?? Math.max(0, ...rows.flatMap((row) => row.values), 0));
	const template = $derived(`minmax(0,7rem) repeat(${Math.max(columns.length, 1)}, minmax(0,1fr))`);
	const set = $derived(resolveGlyphs(glyphs));
</script>

{@render children?.()}

<Graph {title} class={className} {corner}>
	<GraphBody class="flex flex-col gap-4">
		<div class="flex w-full flex-col gap-2">
			<div class="grid w-full items-end gap-x-1" style:grid-template-columns={template}>
				<span></span>
				{#each columns as column, index (index)}
					<span class="truncate text-center text-graph-muted">{column}</span>
				{/each}
			</div>
			<ul class="flex flex-col gap-1" role="list" {@attach reveal({ stagger: 0.04, amount: 0.4 })}>
				{#each rows as row, rowIndex (rowIndex)}
					<li
						aria-label={`${row.label}: ${columns
							.map((column, index) => `${column} ${row.values[index] ?? 0}`)
							.join(', ')}`}
						class="grid items-center gap-x-1"
						style:grid-template-columns={template}
						data-reveal
					>
						<span class="truncate text-foreground">{row.label}</span>
						{#each { length: columns.length }, index (index)}
							{@const level = intensityLevel(row.values[index] ?? 0, peak)}
							<span
								aria-hidden="true"
								class={cn('text-center leading-none select-none', intensityClass(level, palette))}
								>{intensityGlyph(level, set)}</span
							>
						{/each}
					</li>
				{/each}
			</ul>
		</div>
		{#if legend || caption}
			<div class="flex flex-wrap items-center justify-between gap-3">
				{#if caption}
					<p class="text-graph-muted">{caption}</p>
				{:else}
					<span></span>
				{/if}
				{#if legend}
					<IntensityScale glyphs={set} {palette} />
				{/if}
			</div>
		{/if}
	</GraphBody>
</Graph>
