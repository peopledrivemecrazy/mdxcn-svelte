<script lang="ts">
	import type { Snippet } from 'svelte';

	import {
		Graph,
		GraphBody,
		provideItems,
		reveal,
		toneClass,
		type GraphPalette
	} from '$lib/registry/graph-frame/index.js';
	import { cn } from '$lib/utils.js';

	import type { CheckItem } from './types.js';

	export type GraphCheckProps = {
		title: string;
		/** Data form. Or write `<Task />` children. */
		items?: readonly CheckItem[];
		children?: Snippet;
		palette?: GraphPalette;
		corner?: string;
		class?: string;
	};

	let {
		title,
		items: itemsProp,
		children,
		palette,
		corner,
		class: className
	}: GraphCheckProps = $props();

	const tasks = provideItems();

	const items = $derived(
		(itemsProp ?? tasks.list<CheckItem>('Task')).map((entry) => ({
			...entry,
			label: entry.label ?? ''
		}))
	);
	const doneCount = $derived(items.filter((entry) => entry.done).length);
</script>

{@render children?.()}

<Graph {title} class={className} {corner}>
	<GraphBody>
		<ul class="flex flex-col gap-2" role="list" {@attach reveal({ stagger: 0.05, amount: 0.4 })}>
			{#each items as entry, index (index)}
				{@const done = Boolean(entry.done)}
				<li class="grid grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-x-3" data-reveal>
					<span
						aria-hidden="true"
						class={cn('select-none', done ? toneClass(palette, 'primary') : 'text-graph-muted')}
						>{done ? '[x]' : '[ ]'}</span
					>
					<span class="flex min-w-0 flex-col gap-1">
						<span class={done ? 'text-foreground' : 'text-graph-muted'}>{entry.label}</span>
						{#if entry.note}
							<span class="text-graph-muted">{entry.note}</span>
						{/if}
					</span>
				</li>
			{/each}
		</ul>
		<span class="sr-only">{doneCount} of {items.length} done</span>
	</GraphBody>
</Graph>
