<script lang="ts">
	import type { Snippet } from 'svelte';

	import { Graph, GraphBody, provideItems, reveal } from '$lib/registry/graph-frame/index.js';
	import { cn } from '$lib/utils.js';

	import { flatten, type TreeNode } from './types.js';

	export type GraphTreeProps = {
		title: string;
		/** Data form. Or nest `<Node />` children. */
		nodes?: readonly TreeNode[];
		children?: Snippet;
		corner?: string;
		class?: string;
	};

	let { title, nodes, children, corner, class: className }: GraphTreeProps = $props();

	const items = provideItems();

	const rows = $derived(flatten(nodes ?? items.list<TreeNode>('Node')));
</script>

{@render children?.()}

<Graph {title} class={className} {corner}>
	<GraphBody class="graph-scroll-x">
		<ul
			role="list"
			class="flex min-w-max flex-col gap-1"
			{@attach reveal({ stagger: 0.03, amount: 0.4 })}
		>
			{#each rows as row (row.key)}
				<li class="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6" data-reveal>
					<span class="whitespace-nowrap"
						><span aria-hidden="true" class="text-graph-frame select-none">{row.branch}</span><span
							class={cn(row.accent ? 'text-graph-accent' : 'text-foreground')}>{row.label}</span
						></span
					>
					{#if row.meta}
						<span class="text-graph-muted tabular-nums">{row.meta}</span>
					{:else}
						<span></span>
					{/if}
				</li>
			{/each}
		</ul>
		<span class="sr-only">Tree with {rows.length} nodes</span>
	</GraphBody>
</Graph>
