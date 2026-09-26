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

	import type { GraphAlign, SheetCells, SheetSection } from './types.js';

	export type GraphSheetProps = {
		title: string;
		/** Data form. Or write `<Head cells="Item | Owner | Status" />`. */
		headers?: SheetCells;
		/** Data form. Or write `<Section>` children. */
		sections?: readonly SheetSection[];
		footer?: SheetCells;
		align?: readonly GraphAlign[] | string;
		children?: Snippet;
		corner?: string;
		class?: string;
	};

	let {
		title,
		headers: headersProp,
		sections: sectionsProp,
		footer: footerProp,
		align: alignProp,
		children,
		corner,
		class: className
	}: GraphSheetProps = $props();

	const items = provideItems();

	type Line = { cells?: SheetCells; align?: readonly MdAlign[] | string };

	const head = $derived(items.list<Line>('Head')[0]);
	const headers = $derived(cellsOf(headersProp ?? head?.cells));
	const sections = $derived(
		(sectionsProp ?? items.list<SheetSection>('Section')).map((section) => ({
			title: section.title,
			rows: section.rows.map((row) => cellsOf(row))
		}))
	);
	const footer = $derived.by(() => {
		const cells = footerProp ?? items.list<Line>('Foot')[0]?.cells;
		return cells == null ? undefined : cellsOf(cells);
	});
	const align = $derived(alignsOf(alignProp ?? head?.align, headers.length));
	const columns = $derived(headers.length);

	function cellClass(index: number, extra?: string) {
		return cn(
			'relative px-3 py-2.5',
			align[index] === 'right' ? 'text-right tabular-nums' : 'text-left',
			extra
		);
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
									align[index] === 'right' ? 'text-right' : 'text-left'
								)}
							>
								{#if index > 0}{@render ruleY()}{/if}
								{header}
							</th>
						{/each}
					</tr>
					<tr>
						<th colspan={columns} class="p-0"><GraphRule /></th>
					</tr>
				</thead>
				{#each sections as section, sectionIndex (sectionIndex)}
					<tbody {@attach reveal({ stagger: 0.04, amount: 0.4 })}>
						{#if sectionIndex > 0}
							<tr>
								<td colspan={columns} class="pt-4 pb-1"><GraphRule /></td>
							</tr>
						{/if}
						<tr>
							<td class="px-3 pt-3 pb-1 text-graph-muted" colspan={columns}>{section.title}</td>
						</tr>
						{#each section.rows as row, rowIndex (rowIndex)}
							<tr data-reveal>
								{#each row as cell, cellIndex (cellIndex)}
									<td class={cellClass(cellIndex, 'whitespace-nowrap')}>
										{#if cellIndex > 0}{@render ruleY()}{/if}
										{cell}
									</td>
								{/each}
							</tr>
						{/each}
					</tbody>
				{/each}
				{#if footer}
					<tfoot>
						<tr>
							<td colspan={columns} class="pt-3 pb-3"><GraphRule /></td>
						</tr>
						<tr>
							{#each footer as cell, cellIndex (cellIndex)}
								<td class={cellClass(cellIndex, 'whitespace-nowrap')}>
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
