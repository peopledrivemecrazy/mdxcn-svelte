<script lang="ts">
	import type { Snippet } from 'svelte';

	import {
		alignsOf,
		cellsOf,
		Graph,
		GraphBody,
		GraphRule,
		provideItems,
		reveal,
		type MdAlign
	} from '$lib/registry/graph-frame/index.js';
	import { cn } from '$lib/utils.js';

	type Cells = string | readonly (string | number)[];

	export type GraphTableProps = {
		title: string;
		/** Data form. Or write `<Head cells="Name | Value" />`. */
		headers?: Cells;
		/** Data form. Or write `<Row cells="docs | 12,400" />`. */
		rows?: readonly Cells[];
		footer?: Cells;
		align?: readonly MdAlign[] | string;
		children?: Snippet;
		corner?: string;
		class?: string;
	};

	let {
		title,
		headers: headersProp,
		rows: rowsProp,
		footer: footerProp,
		align: alignProp,
		children,
		corner,
		class: className
	}: GraphTableProps = $props();

	const items = provideItems();

	type Line = { cells?: Cells; align?: readonly MdAlign[] | string };

	const head = $derived(items.list<Line>('Head')[0]);
	const headers = $derived(cellsOf(headersProp ?? head?.cells));
	const rows = $derived(
		(rowsProp ?? items.list<Line>('Row').map((row) => row.cells)).map((row) => cellsOf(row))
	);
	const footer = $derived.by(() => {
		const cells = footerProp ?? items.list<Line>('Foot')[0]?.cells;
		return cells == null ? undefined : cellsOf(cells);
	});
	const align = $derived(alignsOf(alignProp ?? head?.align, headers.length));

	function alignClass(index: number, numeric = false) {
		return align[index] === 'right' ? cn('text-right', numeric && 'tabular-nums') : 'text-left';
	}
</script>

{@render children?.()}

{#snippet ruleY()}
	<span aria-hidden="true" class="pointer-events-none absolute inset-y-0 left-0 graph-rule-y"
	></span>
{/snippet}

<Graph {title} class={className} {corner}>
	<GraphBody class="px-3 py-6 sm:px-6 sm:py-8">
		<div class="@container graph-scroll-x">
			<table class="w-full min-w-lg border-separate border-spacing-0">
				<thead>
					<tr>
						{#each headers as header, index (index)}
							<th
								class={cn(
									'relative px-3 pb-3 font-normal whitespace-nowrap text-foreground',
									alignClass(index)
								)}
							>
								{#if index > 0}{@render ruleY()}{/if}
								{header}
							</th>
						{/each}
					</tr>
					<tr>
						<th colspan={headers.length} class="p-0"><GraphRule /></th>
					</tr>
				</thead>
				<tbody {@attach reveal({ stagger: 0.04, amount: 0.4 })}>
					{#each rows as row, rowIndex (rowIndex)}
						<tr data-reveal>
							{#each row as cell, cellIndex (cellIndex)}
								<td
									class={cn('relative px-3 py-2.5 whitespace-nowrap', alignClass(cellIndex, true))}
								>
									{#if cellIndex > 0}{@render ruleY()}{/if}
									{cell}
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
				{#if footer}
					<tfoot>
						<tr>
							<td colspan={headers.length} class="pt-2 pb-3"><GraphRule /></td>
						</tr>
						<tr>
							{#each footer as cell, cellIndex (cellIndex)}
								<td class={cn('relative px-3 pt-1 whitespace-nowrap', alignClass(cellIndex, true))}>
									{#if cellIndex > 0}{@render ruleY()}{/if}
									{cell}
								</td>
							{/each}
						</tr>
					</tfoot>
				{/if}
			</table>
		</div>
	</GraphBody>
</Graph>
