<script lang="ts">
	import type { Snippet } from 'svelte';

	import {
		Graph,
		GraphArrow,
		GraphBody,
		provideItems,
		reveal,
		toneClass,
		type GraphPalette
	} from '$lib/registry/graph-frame/index.js';
	import { cn } from '$lib/utils.js';

	import { nodesOf, type FlowNode, type FlowRow, type FlowTone } from './types.js';

	export type GraphFlowProps = {
		title: string;
		/** Data form. Or write `<Path>` children. */
		rows?: readonly FlowRow[];
		children?: Snippet;
		palette?: GraphPalette;
		corner?: string;
		class?: string;
	};

	let {
		title,
		rows: rowsProp,
		children,
		palette,
		corner,
		class: className
	}: GraphFlowProps = $props();

	const items = provideItems();

	const tones = $derived<Record<FlowTone, string>>({
		default: 'text-foreground',
		accent: toneClass(palette, 'primary'),
		muted: toneClass(palette, 'secondary')
	});
	const rows = $derived(
		rowsProp ??
			items
				.list<{ text?: string; nodes?: FlowNode[] }>('Path')
				.map((path) => ({ nodes: path.nodes ?? nodesOf(path.text ?? '') }))
	);
</script>

{@render children?.()}

<Graph {title} class={className} {corner}>
	<GraphBody class="flex flex-col gap-7">
		<div class="flex flex-col gap-7" {@attach reveal({ stagger: 0.08, amount: 0.5 })}>
			{#each rows as row, rowIndex (rowIndex)}
				<div class="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2 sm:flex-nowrap" data-reveal>
					{#each row.nodes as node, nodeIndex (`${node.label}-${nodeIndex}`)}
						{@const tone = node.tone ?? 'default'}
						<div class={cn('flex min-w-0 items-center gap-3', node.stretch && 'min-w-16 flex-1')}>
							{#if nodeIndex > 0}
								<GraphArrow accent={tone === 'accent'} stretch={node.stretch} />
							{/if}
							<span class={cn('shrink-0 whitespace-nowrap', tones[tone])}>{node.label}</span>
						</div>
					{/each}
				</div>
			{/each}
		</div>
	</GraphBody>
</Graph>
