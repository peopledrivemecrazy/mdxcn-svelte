<script lang="ts">
	import type { Snippet } from 'svelte';

	import {
		Graph,
		GraphBody,
		GraphTick,
		GraphTrack,
		numberOf,
		provideItems,
		reveal,
		toneClass,
		trackMarks,
		type Glyphs,
		type GraphPalette
	} from '$lib/registry/graph-frame/index.js';

	import type { RankItem } from './rank.svelte';

	export type GraphRankProps = {
		title: string;
		/** Data form. Or write `<Rank />` children. */
		items?: readonly RankItem[];
		children?: Snippet;
		max?: number;
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
		max,
		ticks = 20,
		glyphs,
		palette,
		corner,
		class: className
	}: GraphRankProps = $props();

	const registry = provideItems();

	const entries = $derived(
		(itemsProp ?? registry.list<RankItem>('Rank')).map((entry) => {
			const value = numberOf(entry.value);
			return {
				label: entry.label ?? '',
				value,
				shown:
					entry.display ??
					value.toLocaleString('en-US', {
						maximumFractionDigits: Number.isInteger(value) ? 0 : 1
					})
			};
		})
	);
	const peak = $derived(max ?? Math.max(...entries.map((entry) => entry.value), 1));
	const marks = $derived(trackMarks(glyphs, { empty: '-', rest: '=', fill: '=' }));
</script>

{@render children?.()}

<Graph {title} class={className} {corner}>
	<GraphBody class="flex flex-col gap-3">
		<ol
			class="flex w-full list-none flex-col gap-2"
			{@attach reveal({ stagger: 0.05, amount: 0.4 })}
		>
			{#each entries as entry, rowIndex (rowIndex)}
				{@const filled = Math.min(ticks, Math.round((Math.max(entry.value, 0) / peak) * ticks))}
				<li
					aria-label={`${entry.label} ${entry.shown}`}
					class="grid grid-cols-[minmax(0,7rem)_minmax(0,1fr)_minmax(0,7rem)] items-center gap-x-2 sm:gap-x-4"
					data-reveal
				>
					<span class="truncate text-foreground">{entry.label}</span>
					<span class="flex min-w-0 items-center">
						<span aria-hidden="true" class="text-graph-frame select-none">[</span>
						<GraphTrack>
							{#each { length: ticks }, index (index)}
								{@const on = index < filled}
								<GraphTick class={on ? toneClass(palette, 'primary') : 'text-graph-frame'}
									>{on ? marks.fill : marks.empty}</GraphTick
								>
							{/each}
						</GraphTrack>
						<span aria-hidden="true" class="text-graph-frame select-none">]</span>
					</span>
					<span class="text-right text-graph-muted tabular-nums">{entry.shown}</span>
				</li>
			{/each}
		</ol>
	</GraphBody>
</Graph>
