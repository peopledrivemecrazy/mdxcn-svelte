<script lang="ts">
	import type { Snippet } from 'svelte';

	import {
		Graph,
		GraphBody,
		numberOf,
		provideItems,
		reveal,
		toneClass,
		type GraphPalette
	} from '$lib/registry/graph-frame/index.js';
	import { cn } from '$lib/utils.js';

	import type { SlopeItem } from './slope.svelte';

	export type GraphSlopeProps = {
		title: string;
		fromLabel: string;
		toLabel: string;
		/** Data form. Or write `<Slope />` children. */
		items?: readonly SlopeItem[];
		children?: Snippet;
		palette?: GraphPalette;
		corner?: string;
		class?: string;
	};

	let {
		title,
		fromLabel,
		toLabel,
		items: itemsProp,
		children,
		palette,
		corner,
		class: className
	}: GraphSlopeProps = $props();

	const registry = provideItems();

	const rows = $derived(
		(itemsProp ?? registry.list<SlopeItem>('Slope')).map((entry) => {
			const from = numberOf(entry.from);
			const to = numberOf(entry.to);
			return {
				label: entry.label ?? '',
				from,
				to,
				up: to > from,
				down: to < from
			};
		})
	);

	function format(value: number) {
		return value.toLocaleString('en-US', {
			maximumFractionDigits: Number.isInteger(value) ? 0 : 1
		});
	}
</script>

{@render children?.()}

<Graph {title} class={className} {corner}>
	<GraphBody class="flex flex-col gap-3">
		<div class="grid grid-cols-[minmax(0,1fr)_6.5rem_2rem_6.5rem] items-end gap-x-3">
			<span></span>
			<span class="text-right text-graph-muted">{fromLabel}</span>
			<span></span>
			<span class="text-right text-graph-muted">{toLabel}</span>
		</div>
		<ul class="flex flex-col gap-2" role="list" {@attach reveal({ stagger: 0.05, amount: 0.4 })}>
			{#each rows as row, index (index)}
				<li
					aria-label={`${row.label} from ${format(row.from)} to ${format(row.to)}`}
					class="grid grid-cols-[minmax(0,1fr)_6.5rem_2rem_6.5rem] items-baseline gap-x-3"
					data-reveal
				>
					<span class="truncate text-foreground">{row.label}</span>
					<span class="text-right text-graph-muted tabular-nums">{format(row.from)}</span>
					<span
						aria-hidden="true"
						class={cn(
							'text-center select-none',
							row.up && toneClass(palette, 'primary'),
							row.down && toneClass(palette, 'secondary'),
							!row.up && !row.down && toneClass(palette, 'empty')
						)}
					>
						{row.up || row.down ? '→' : '–'}
					</span>
					<span
						class={cn(
							'text-right tabular-nums',
							row.up && toneClass(palette, 'primary'),
							row.down && toneClass(palette, 'secondary'),
							!row.up && !row.down && 'text-foreground'
						)}
					>
						{format(row.to)}
					</span>
				</li>
			{/each}
		</ul>
	</GraphBody>
</Graph>
