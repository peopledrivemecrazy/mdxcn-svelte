<script lang="ts">
	import type { Snippet } from 'svelte';

	import {
		Graph,
		GraphArrow,
		GraphBody,
		numbers,
		provideItems,
		toneClass,
		trackMarks,
		type Glyphs,
		type GraphPalette
	} from '$lib/registry/graph-frame/index.js';

	import MiniBars from './mini-bars.svelte';
	import type { BarSeries } from './types.js';

	export type GraphBarsProps = {
		title: string;
		/** Left series. Or write two `<Series>` children. */
		from?: BarSeries;
		/** Right series. Or write two `<Series>` children. */
		to?: BarSeries;
		children?: Snippet;
		processor?: string;
		glyphs?: Glyphs;
		palette?: GraphPalette;
		corner?: string;
		class?: string;
	};

	let {
		title,
		from: fromProp,
		to: toProp,
		children,
		processor,
		glyphs,
		palette,
		corner,
		class: className
	}: GraphBarsProps = $props();

	const items = provideItems();

	const empty: BarSeries = { label: '', values: [] };
	const series = $derived(items.list<BarSeries>('Series'));
	const from = $derived(fromProp ?? series[0] ?? empty);
	const to = $derived(toProp ?? series[1] ?? empty);
	const marks = $derived(trackMarks(glyphs));
</script>

{@render children?.()}

<Graph {title} class={className} {corner}>
	<GraphBody>
		<div
			class="flex flex-col items-center gap-8 sm:flex-row sm:items-end sm:justify-center sm:gap-8"
		>
			<div class="flex flex-col items-center gap-3">
				<MiniBars
					delay={0.04}
					fill={marks.fill}
					height={from.size === 'lg' ? 8 : 5}
					{palette}
					tone="muted"
					values={numbers(from.values)}
				/>
				<p class={toneClass(palette, 'secondary')}>{from.label}</p>
			</div>

			<div class="flex items-center justify-center gap-3 text-graph-muted max-sm:rotate-90">
				<GraphArrow />
				{#if processor}<span>{processor}</span>{/if}
				<GraphArrow />
			</div>

			<div class="flex flex-col items-center gap-3">
				<MiniBars
					delay={0.16}
					fill={marks.fill}
					height={to.size === 'lg' ? 8 : 5}
					{palette}
					values={numbers(to.values)}
				/>
				<p class="text-foreground">{to.label}</p>
			</div>
		</div>
	</GraphBody>
</Graph>
