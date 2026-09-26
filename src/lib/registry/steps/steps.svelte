<script lang="ts">
	import type { Snippet } from 'svelte';

	import {
		Graph,
		GraphBody,
		GraphProse,
		provideItems,
		reveal
	} from '$lib/registry/graph-frame/index.js';
	import { cn } from '$lib/utils.js';

	import type { StepProps } from './step.svelte';

	export type StepsProps = {
		title?: string;
		/** `<Step>` items, in order. */
		children?: Snippet;
		corner?: string;
		class?: string;
	};

	let { title, children, corner, class: className }: StepsProps = $props();

	const items = provideItems();

	const steps = $derived(items.list<StepProps>('Step'));
	const digits = $derived(String(steps.length).length);
</script>

{@render children?.()}

<Graph class={className} {corner} {title}>
	<GraphBody>
		<ol class="flex flex-col" role="list" {@attach reveal({ stagger: 0.06, amount: 0.3 })}>
			{#each steps as step, index (index)}
				{@const state = step.state ?? 'done'}
				{@const last = index === steps.length - 1}
				{@const live = state === 'now'}
				{@const next = state === 'next'}
				<li class="flex flex-col" data-reveal>
					<div class="grid grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-x-3">
						<span
							aria-hidden="true"
							class={cn(
								'tabular-nums select-none',
								live && 'text-graph-accent',
								next && 'text-graph-frame',
								!live && !next && 'text-graph-muted'
							)}
						>
							{String(index + 1).padStart(Math.max(2, digits), '0')}
						</span>
						<div class="flex min-w-0 flex-col gap-2">
							{#if step.title}
								<p
									class={cn(
										'text-pretty',
										live && 'text-graph-accent',
										next && 'text-graph-muted',
										!live && !next && 'text-foreground'
									)}
								>
									{step.title}
								</p>
							{/if}
							{#if step.children}
								<GraphProse class={cn(next ? 'text-graph-muted' : 'text-foreground/80')}>
									{@render step.children()}
								</GraphProse>
							{/if}
						</div>
					</div>
					{#if !last}
						<div
							aria-hidden="true"
							class="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-3 py-2 select-none"
						>
							<span class="text-center text-graph-frame">│</span>
						</div>
					{/if}
				</li>
			{/each}
		</ol>
	</GraphBody>
</Graph>
