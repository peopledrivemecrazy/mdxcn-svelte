<script lang="ts">
	import type { Snippet } from 'svelte';

	import {
		cellsOf,
		DIM_OPACITY,
		Graph,
		GraphBody,
		isMonoPalette,
		provideItems,
		reveal,
		seriesClass,
		words,
		type GraphPalette
	} from '$lib/registry/graph-frame/index.js';
	import { cn } from '$lib/utils.js';

	export type CompareCell = string | boolean;

	export type CompareRow = {
		label: string;
		values: CompareCell[];
	};

	export type GraphCompareProps = {
		title: string;
		/** Data form. Or write `<Col label="Studio" />` / `<Head cells="Solo | Studio" />` / `"Solo Studio"`. */
		columns?: string[] | string;
		/** Data form. Or write `<Row label="Registry" cells="yes yes" />`. */
		rows?: CompareRow[];
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
	}: GraphCompareProps = $props();

	const items = provideItems();

	function compareCell(token: string): CompareCell {
		const value = token.trim();
		const key = value.toLowerCase();
		if (key === 'true' || key === 'yes' || value === '✓' || key === 'x') {
			return true;
		}
		if (key === 'false' || key === 'no' || value === '–' || value === '-' || value === '—') {
			return false;
		}
		return value;
	}

	function cellText(value: CompareCell) {
		if (typeof value === 'boolean') {
			return value ? '✓' : '–';
		}
		return value;
	}

	type Line = { label?: string; cells?: string | readonly (string | number)[] };

	const columns = $derived.by(() => {
		if (columnsProp != null) {
			return words(columnsProp);
		}
		const cols = items.list<{ label: string }>('Col').map((col) => col.label);
		return cols.length > 0 ? cols : cellsOf(items.list<Line>('Head')[0]?.cells);
	});
	const rows = $derived(
		(
			rowsProp ??
			items.list<Line>('Row').map((row) => ({
				label: row.label ?? '',
				values: cellsOf(row.cells).map(compareCell)
			}))
		).map((row) => ({ ...row, label: row.label ?? '' }))
	);
	const template = $derived(`minmax(7rem,1fr) repeat(${columns.length}, minmax(4.5rem, 7rem))`);
	const mono = $derived(isMonoPalette(palette));
</script>

{@render children?.()}

<Graph {title} class={className} {corner}>
	<GraphBody class="graph-scroll-x">
		<div class="flex min-w-lg flex-col gap-3">
			<div class="grid items-end gap-x-4" style:grid-template-columns={template}>
				<span></span>
				{#each columns as column, index (index)}
					{@const focused = Boolean(accent) && column === accent}
					<span
						class={cn(
							'text-right',
							mono
								? focused
									? 'text-graph-accent'
									: 'text-graph-muted'
								: seriesClass(palette, index)
						)}>{column}</span
					>
				{/each}
			</div>
			<ul class="flex flex-col gap-2" role="list" {@attach reveal({ stagger: 0.04, amount: 0.4 })}>
				{#each rows as row, rowIndex (rowIndex)}
					<li
						class="grid items-baseline gap-x-4"
						style:grid-template-columns={template}
						data-reveal
					>
						<span class="truncate text-foreground">{row.label}</span>
						{#each columns as column, index (index)}
							{@const value = row.values[index]}
							{@const focused = Boolean(accent) && column === accent}
							{@const dim = Boolean(accent) && !focused}
							{@const mark = typeof value === 'boolean'}
							{@const on = value === true}
							<span
								class={cn(
									'text-right',
									!mark && 'tabular-nums',
									on &&
										(mono
											? (focused || !accent) && 'text-graph-accent'
											: seriesClass(palette, index)),
									on && mono && dim && 'text-foreground',
									mark && !on && 'text-graph-frame',
									!mark && focused && 'text-foreground',
									!mark && dim && 'text-graph-muted'
								)}
								style:opacity={dim && !on && mono ? DIM_OPACITY : undefined}
								>{value == null ? '' : cellText(value)}</span
							>
						{/each}
					</li>
				{/each}
			</ul>
		</div>
	</GraphBody>
</Graph>
