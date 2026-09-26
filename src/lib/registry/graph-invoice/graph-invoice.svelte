<script lang="ts">
	import type { Snippet } from 'svelte';

	import {
		Graph,
		GraphBody,
		GraphRule,
		linesOf,
		provideItems,
		reveal
	} from '$lib/registry/graph-frame/index.js';
	import { cn } from '$lib/utils.js';

	import type { InvoiceItem, InvoiceMeta, InvoiceParty, InvoiceTotal } from './types.js';

	export type GraphInvoiceProps = {
		title: string;
		/** A string (name, then one address line per newline), or name plus lines. Or `<From>`. */
		from?: InvoiceParty | string;
		/** Same forms as `from`. Or `<To>`. */
		to?: InvoiceParty | string;
		/** Data form. Or write `<Meta label="Due" value="Apr 11" />`. */
		meta?: InvoiceMeta[];
		/** Data form. Or write `<Item description="…" amount="…" />`. */
		items?: InvoiceItem[];
		/** Data form. Or write `<Total label="Amount due" value="7,440" accent />`. */
		totals?: InvoiceTotal[];
		note?: string;
		children?: Snippet;
		corner?: string;
		class?: string;
	};

	let {
		title,
		from: fromProp,
		to: toProp,
		meta: metaProp,
		items: itemsProp,
		totals: totalsProp,
		note,
		children,
		corner,
		class: className
	}: GraphInvoiceProps = $props();

	const registered = provideItems();

	type Party = { name: string; lines?: string[] };

	function partyOf(value: InvoiceParty | string | undefined): Party | undefined {
		if (value == null) {
			return undefined;
		}

		if (typeof value === 'string') {
			const [name, ...lines] = linesOf(value);
			if (!name) {
				return undefined;
			}
			return { name, lines: lines.length > 0 ? lines : undefined };
		}

		const lines = typeof value.lines === 'string' ? linesOf(value.lines) : [...(value.lines ?? [])];
		return { name: value.name, lines: lines.length > 0 ? lines : undefined };
	}

	const from = $derived(partyOf(fromProp ?? registered.list<InvoiceParty>('From')[0]));
	const to = $derived(partyOf(toProp ?? registered.list<InvoiceParty>('To')[0]));
	const meta = $derived(metaProp ?? registered.list<InvoiceMeta>('Meta'));
	const items = $derived(
		(itemsProp ?? registered.list<InvoiceItem>('Item')).map((entry) => ({
			...entry,
			description: entry.description ?? ''
		}))
	);
	const totals = $derived(totalsProp ?? registered.list<InvoiceTotal>('Total'));
	const showQty = $derived(items.some((row) => row.qty != null));
	const showRate = $derived(items.some((row) => row.rate != null));
	const columns = $derived(1 + Number(showQty) + Number(showRate) + 1);
</script>

{@render children?.()}

{#snippet party(label: string, party: Party)}
	<div class="flex flex-col gap-1">
		<p class="font-mono tracking-wide text-graph-muted uppercase">{label}</p>
		<p class="text-foreground">{party.name}</p>
		{#each party.lines ?? [] as line, index (index)}
			<p class="text-graph-muted">{line}</p>
		{/each}
	</div>
{/snippet}

<Graph {title} class={className} {corner}>
	<GraphBody class="flex flex-col gap-8">
		{#if from || to}
			<div class="grid gap-6 sm:grid-cols-2">
				{#if from}{@render party('From', from)}{/if}
				{#if to}{@render party('Bill to', to)}{/if}
			</div>
		{/if}

		{#if meta.length > 0}
			<dl class="flex flex-wrap gap-x-8 gap-y-3">
				{#each meta as entry, index (index)}
					<div class="flex flex-col gap-1">
						<dt class="font-mono tracking-wide text-graph-muted uppercase">{entry.label}</dt>
						<dd class="text-foreground tabular-nums">{entry.value}</dd>
					</div>
				{/each}
			</dl>
		{/if}

		<div class="@container graph-scroll-x">
			<table class="w-full min-w-lg border-separate border-spacing-0">
				<thead>
					<tr>
						<th class="px-0 pb-3 text-left font-normal text-graph-muted">Description</th>
						{#if showQty}
							<th class="px-3 pb-3 text-right font-normal text-graph-muted">Qty</th>
						{/if}
						{#if showRate}
							<th class="px-3 pb-3 text-right font-normal text-graph-muted">Rate</th>
						{/if}
						<th class="px-0 pb-3 text-right font-normal text-graph-muted">Amount</th>
					</tr>
					<tr>
						<th colspan={columns} class="p-0"><GraphRule /></th>
					</tr>
				</thead>
				<tbody {@attach reveal({ stagger: 0.04, amount: 0.4 })}>
					{#each items as row, index (index)}
						<tr data-reveal>
							<td class="px-0 py-2.5 text-left">{row.description}</td>
							{#if showQty}
								<td class="px-3 py-2.5 text-right tabular-nums">{row.qty ?? ''}</td>
							{/if}
							{#if showRate}
								<td class="px-3 py-2.5 text-right tabular-nums">{row.rate ?? ''}</td>
							{/if}
							<td class="px-0 py-2.5 text-right tabular-nums">{row.amount}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		{#if totals.length > 0}
			<div class="flex flex-col gap-3">
				<GraphRule />
				<dl
					class="ml-auto flex w-full max-w-[22rem] flex-col gap-2"
					{@attach reveal({ stagger: 0.04 })}
				>
					{#each totals as entry, index (index)}
						<div class="grid grid-cols-[minmax(0,1fr)_8rem] items-baseline gap-x-4" data-reveal>
							<dt class={cn(entry.accent ? 'text-foreground' : 'text-graph-muted')}>
								{entry.label}
							</dt>
							<dd
								class={cn(
									'text-right tabular-nums',
									entry.accent ? 'text-graph-accent' : 'text-foreground'
								)}
							>
								{entry.value}
							</dd>
						</div>
					{/each}
				</dl>
			</div>
		{/if}

		{#if note}
			<p class="max-w-[48ch] text-pretty text-graph-muted">{note}</p>
		{/if}
	</GraphBody>
</Graph>
