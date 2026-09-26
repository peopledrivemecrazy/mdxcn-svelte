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

	import type { TimelineEvent, TimelineState } from './types.js';

	export type GraphTimelineProps = {
		title: string;
		/** Data form. Or write `<Event />` children. */
		events?: readonly TimelineEvent[];
		children?: Snippet;
		palette?: GraphPalette;
		corner?: string;
		class?: string;
	};

	let {
		title,
		events: eventsProp,
		children,
		palette,
		corner,
		class: className
	}: GraphTimelineProps = $props();

	const items = provideItems();

	const mark: Record<TimelineState, string> = {
		done: '●',
		now: '●',
		next: '○'
	};

	const events = $derived(
		(eventsProp ?? items.list<TimelineEvent>('Event')).map((entry) => ({
			...entry,
			label: entry.label ?? ''
		}))
	);

	function tone(state: TimelineState) {
		return cn(
			state === 'now' && toneClass(palette, 'primary'),
			state === 'done' && 'text-foreground',
			state === 'next' && toneClass(palette, 'secondary')
		);
	}
</script>

{@render children?.()}

<Graph {title} class={className} {corner}>
	<GraphBody>
		<ol class="flex flex-col" role="list" {@attach reveal({ stagger: 0.05, amount: 0.4 })}>
			{#each events as event, index (index)}
				{@const state = event.state ?? 'done'}
				<li class="flex flex-col" data-reveal>
					<div class="grid grid-cols-[1.25rem_7rem_minmax(0,1fr)] items-baseline gap-x-4">
						<span
							aria-hidden="true"
							class={cn('text-center leading-none select-none', tone(state))}
						>
							{mark[state]}
						</span>
						<span
							class={cn(
								'tabular-nums',
								state === 'next' ? toneClass(palette, 'secondary') : 'text-foreground'
							)}
						>
							{event.date}
						</span>
						<span class={tone(state)}>{event.label}</span>
					</div>
					{#if index !== events.length - 1}
						<div
							aria-hidden="true"
							class="grid grid-cols-[1.25rem_7rem_minmax(0,1fr)] gap-x-4 py-1 select-none"
						>
							<span class="text-center text-graph-frame">│</span>
						</div>
					{/if}
				</li>
			{/each}
		</ol>
	</GraphBody>
</Graph>
