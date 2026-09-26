<script lang="ts">
	import type { Snippet } from 'svelte';

	import { Graph, GraphBody, provideItems, reveal } from '$lib/registry/graph-frame/index.js';
	import { cn } from '$lib/utils.js';

	import type { StatProps } from './stat.svelte';

	export type StatItem = StatProps;

	export type GraphStatProps = {
		title: string;
		/** Data form. Or write `<Stat />` children. */
		items?: StatItem[];
		children?: Snippet;
		corner?: string;
		class?: string;
	};

	let { title, items: itemsProp, children, corner, class: className }: GraphStatProps = $props();

	const columnClass: Record<number, string> = {
		1: 'sm:grid-cols-1',
		2: 'sm:grid-cols-2',
		3: 'sm:grid-cols-3',
		4: 'sm:grid-cols-4'
	};

	const registered = provideItems();

	const items = $derived(
		(itemsProp ?? registered.list<StatItem>('Stat')).map((entry) => ({
			...entry,
			label: entry.label ?? ''
		}))
	);
	const columns = $derived(Math.min(Math.max(items.length, 1), 4));
</script>

{@render children?.()}

<Graph {title} class={className} {corner}>
	<GraphBody>
		<ul
			class={cn('grid gap-8', columnClass[columns])}
			role="list"
			{@attach reveal({ stagger: 0.06, amount: 0.5 })}
		>
			{#each items as entry, index (index)}
				<li class="flex flex-col gap-2" data-reveal>
					<p
						class={cn(
							'text-3xl tracking-tight tabular-nums sm:text-4xl',
							entry.accent ? 'text-graph-accent' : 'text-foreground'
						)}
					>
						{entry.value}
					</p>
					<p class="text-graph-muted">{entry.label}</p>
					{#if entry.hint}
						<p class="text-graph-muted">{entry.hint}</p>
					{/if}
				</li>
			{/each}
		</ul>
	</GraphBody>
</Graph>
