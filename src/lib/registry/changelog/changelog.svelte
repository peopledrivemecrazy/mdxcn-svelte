<script lang="ts" module>
	import type { ChangeType } from './change.svelte';

	const glyph: Record<ChangeType, string> = {
		add: '+',
		change: '~',
		fix: '*',
		remove: '-'
	};

	const label: Record<ChangeType, string> = {
		add: 'added',
		change: 'changed',
		fix: 'fixed',
		remove: 'removed'
	};
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';

	import {
		Graph,
		GraphBody,
		GraphProse,
		GraphRule,
		provideItems,
		reveal,
		toneClass,
		type GraphPalette
	} from '$lib/registry/graph-frame/index.js';
	import { cn } from '$lib/utils.js';

	import type { ChangeProps } from './change.svelte';

	export type ChangelogProps = {
		/** Drawn as the frame title unless `title` is set. */
		version: string;
		/** Muted, right of the version. */
		date?: string;
		title?: string;
		/** `<Change>` items, in order. */
		children?: Snippet;
		palette?: GraphPalette;
		corner?: string;
		class?: string;
	};

	let {
		version,
		date,
		title,
		children,
		palette,
		corner,
		class: className
	}: ChangelogProps = $props();

	const items = provideItems();

	const changes = $derived(items.list<ChangeProps>('Change'));

	function toneOf(type: ChangeType) {
		return type === 'add'
			? toneClass(palette, 'primary')
			: type === 'remove'
				? toneClass(palette, 'secondary')
				: 'text-foreground';
	}
</script>

{@render children?.()}

<Graph class={className} {corner} title={title ?? version}>
	<GraphBody class="flex flex-col gap-4">
		{#if date || title}
			<div class="flex items-baseline justify-between gap-4">
				<span class="text-foreground tabular-nums">{title ? version : ''}</span>
				{#if date}
					<span class="text-graph-muted tabular-nums">{date}</span>
				{/if}
			</div>
			<GraphRule />
		{/if}
		<ul class="flex flex-col gap-2" role="list" {@attach reveal({ stagger: 0.05, amount: 0.4 })}>
			{#each changes as change, index (index)}
				{@const type = change.type ?? 'change'}
				<li
					class="grid grid-cols-[1.25rem_5.5rem_minmax(0,1fr)] items-baseline gap-x-3 max-sm:grid-cols-[1.25rem_minmax(0,1fr)]"
					data-reveal
				>
					<span aria-hidden="true" class={cn('text-center select-none', toneOf(type))}>
						{glyph[type]}
					</span>
					<span class="text-graph-muted max-sm:hidden">{label[type]}</span>
					<GraphProse class={cn(type === 'remove' ? 'text-graph-muted' : 'text-foreground')}>
						{@render change.children?.()}
					</GraphProse>
				</li>
			{/each}
		</ul>
	</GraphBody>
</Graph>
