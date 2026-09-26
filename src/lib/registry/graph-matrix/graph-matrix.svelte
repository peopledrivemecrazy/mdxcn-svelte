<script lang="ts">
	import type { Snippet } from 'svelte';

	import {
		cellsOf,
		DIM_OPACITY,
		Graph,
		GraphBody,
		GraphRule,
		provideItems,
		reveal,
		toneClass,
		words,
		type GraphPalette
	} from '$lib/registry/graph-frame/index.js';
	import { cn } from '$lib/utils.js';

	export type MatrixRow = {
		label: string;
		values: (number | string)[];
	};

	export type GraphMatrixProps = {
		title: string;
		/** Data form, `"Pos Neg"`, or write `<Head cells="Pos | Neg" />`. */
		columns?: string[] | string;
		/** Data form. Or write `<Row label="Pos" cells="41 3" />`. */
		rows?: MatrixRow[];
		children?: Snippet;
		accent?: string;
		palette?: GraphPalette;
		corner?: string;
		class?: string;
	};

	let {
		title,
		columns: columnsProp,
		rows: rowsProp,
		children,
		accent,
		palette,
		corner,
		class: className
	}: GraphMatrixProps = $props();

	const items = provideItems();

	type Line = { label?: string; cells?: string | readonly (string | number)[] };

	function matrixValues(cells: Line['cells']): (number | string)[] {
		return cellsOf(cells).map((token) => {
			const parsed = Number(token);
			return token !== '' && Number.isFinite(parsed) ? parsed : token;
		});
	}

	function formatCell(value: number | string) {
		if (typeof value === 'number') {
			return value.toLocaleString('en-US', {
				maximumFractionDigits: Number.isInteger(value) ? 0 : 1
			});
		}
		return value;
	}

	const columns = $derived(
		columnsProp == null ? cellsOf(items.list<Line>('Head')[0]?.cells) : words(columnsProp)
	);
	const rows = $derived(
		(
			rowsProp ??
			items.list<Line>('Row').map((row) => ({
				label: row.label ?? '',
				values: matrixValues(row.cells)
			}))
		).map((row) => ({ ...row, label: row.label ?? '' }))
	);
	const template = $derived(`minmax(6rem, 1fr) repeat(${columns.length}, minmax(4.5rem, 7rem))`);
</script>

{@render children?.()}

{#snippet ruleY()}
	<span aria-hidden="true" class="pointer-events-none absolute inset-y-0 left-0 graph-rule-y"
	></span>
{/snippet}

<Graph {title} class={className} {corner}>
	<GraphBody class="graph-scroll-x">
		<div class="flex min-w-lg flex-col">
			<div class="grid items-end" style:grid-template-columns={template}>
				<span></span>
				{#each columns as column, index (index)}
					<span class="relative px-3 pb-3 text-right text-graph-muted">
						{@render ruleY()}
						{column}
					</span>
				{/each}
			</div>
			<GraphRule />
			<ul class="flex flex-col" role="list" {@attach reveal({ stagger: 0.04, amount: 0.4 })}>
				{#each rows as row, rowIndex (rowIndex)}
					{@const live = Boolean(accent) && row.label === accent}
					{@const dim = Boolean(accent) && !live}
					{@const tone = live ? toneClass(palette, 'primary') : 'text-foreground'}
					<li
						class="grid items-baseline"
						style:grid-template-columns={template}
						style:opacity={dim ? DIM_OPACITY : undefined}
						data-reveal
					>
						<span class={cn('truncate py-2.5 pr-3', tone)}>{row.label}</span>
						{#each columns, index (index)}
							<span class={cn('relative px-3 py-2.5 text-right tabular-nums', tone)}>
								{@render ruleY()}
								{formatCell(row.values[index] ?? '')}
							</span>
						{/each}
					</li>
				{/each}
			</ul>
		</div>
		<span class="sr-only">Matrix with {rows.length} rows and {columns.length} columns</span>
	</GraphBody>
</Graph>
