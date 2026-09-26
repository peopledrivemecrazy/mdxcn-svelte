<script lang="ts">
	import type { Snippet } from 'svelte';

	import {
		Graph,
		GraphBody,
		GraphTick,
		GraphTrack,
		isMonoPalette,
		numberOf,
		provideItems,
		reveal,
		seriesClass,
		trackMarks,
		type Glyphs,
		type GraphPalette
	} from '$lib/registry/graph-frame/index.js';

	import type { FunnelStep } from './types.js';

	export type GraphFunnelProps = {
		title: string;
		/** Data form. Or write `<Stage />` children. */
		steps?: readonly FunnelStep[];
		children?: Snippet;
		ticks?: number;
		/** Accepted for API parity with mdxcn. Upstream computes a dim from it that its enter animation overrides, so it has no visible effect. */
		stage?: string;
		glyphs?: Glyphs;
		palette?: GraphPalette;
		corner?: string;
		class?: string;
	};

	let {
		title,
		steps: stepsProp,
		children,
		ticks = 20,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars -- kept for API parity
		stage: _stage,
		glyphs,
		palette,
		corner,
		class: className
	}: GraphFunnelProps = $props();

	const stages = provideItems();

	const steps = $derived(
		(stepsProp ?? stages.list<FunnelStep>('Stage')).map((entry) => ({
			label: entry.label ?? '',
			value: numberOf(entry.value),
			display: entry.display
		}))
	);
	const max = $derived(Math.max(...steps.map((step) => step.value), 1));
	const head = $derived(steps[0]?.value || 1);
	const marks = $derived(trackMarks(glyphs));
</script>

{@render children?.()}

<Graph {title} class={className} {corner}>
	<GraphBody>
		<ol class="flex flex-col gap-3" role="list" {@attach reveal({ stagger: 0.05, amount: 0.4 })}>
			{#each steps as step, index (index)}
				{@const width = Math.max(1, Math.round((step.value / max) * ticks))}
				{@const percent = Math.round((step.value / head) * 100)}
				<li
					class="grid grid-cols-[minmax(0,7rem)_minmax(0,1fr)_minmax(0,8ch)_minmax(0,4ch)] items-center gap-x-2 sm:gap-x-4"
					data-reveal
				>
					<span class="truncate text-foreground">{step.label}</span>
					<GraphTrack>
						{#each { length: ticks }, cell (cell)}
							{@const filled = cell < width}
							<GraphTick
								class={filled
									? isMonoPalette(palette)
										? 'text-graph-accent'
										: seriesClass(palette, index)
									: 'text-graph-frame'}
							>
								{filled ? marks.fill : marks.empty}
							</GraphTick>
						{/each}
					</GraphTrack>
					<span class="text-right text-foreground tabular-nums"
						>{step.display ?? step.value.toLocaleString('en-US')}</span
					>
					<span class="text-right text-graph-muted tabular-nums"
						>{index === 0 ? '' : `${percent}%`}</span
					>
				</li>
			{/each}
		</ol>
	</GraphBody>
</Graph>
