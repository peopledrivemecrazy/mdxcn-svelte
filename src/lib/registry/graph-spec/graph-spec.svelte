<script lang="ts">
	import type { Snippet } from 'svelte';

	import { Graph, GraphBody, provideItems, reveal } from '$lib/registry/graph-frame/index.js';
	import { cn } from '$lib/utils.js';

	import type { FieldProps } from './field.svelte';

	export type SpecRow = FieldProps;

	export type GraphSpecProps = {
		title: string;
		/** Data form. Or write `<Field />` children. */
		rows?: SpecRow[];
		children?: Snippet;
		corner?: string;
		class?: string;
	};

	let { title, rows: rowsProp, children, corner, class: className }: GraphSpecProps = $props();

	const registered = provideItems();

	const rows = $derived(
		(rowsProp ?? registered.list<SpecRow>('Field')).map((entry) => ({
			...entry,
			value: entry.value ?? ''
		}))
	);
</script>

{@render children?.()}

<Graph {title} class={className} {corner}>
	<GraphBody>
		<dl class="flex flex-col gap-3" {@attach reveal({ stagger: 0.04, amount: 0.5 })}>
			{#each rows as row, index (index)}
				<div
					class="grid grid-cols-[minmax(0,11rem)_minmax(0,1fr)] items-baseline gap-x-3 sm:gap-x-6"
					data-reveal
				>
					<dt class="text-graph-muted">{row.label}</dt>
					<dd class={cn('tabular-nums', row.accent ? 'text-graph-accent' : 'text-foreground')}>
						{row.value}
					</dd>
				</div>
			{/each}
		</dl>
	</GraphBody>
</Graph>
