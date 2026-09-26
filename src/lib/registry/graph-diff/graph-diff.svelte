<script lang="ts">
	import type { Snippet } from 'svelte';

	import {
		Graph,
		GraphBody,
		GraphRule,
		provideItems,
		reveal,
		toneClass,
		type GraphPalette
	} from '$lib/registry/graph-frame/index.js';
	import { cn } from '$lib/utils.js';

	import type { DiffLineProps, DiffRow, DiffSign } from './types.js';

	export type GraphDiffProps = {
		title: string;
		/** Data form. Or write `<Line />` children. */
		rows?: DiffRow[];
		footer?: DiffRow;
		children?: Snippet;
		palette?: GraphPalette;
		corner?: string;
		class?: string;
	};

	let {
		title,
		rows: rowsProp,
		footer: footerProp,
		children,
		palette,
		corner,
		class: className
	}: GraphDiffProps = $props();

	const items = provideItems();

	const lines = $derived(items.list<DiffLineProps>('Line'));
	const rows = $derived(
		(rowsProp ?? lines.filter((entry) => !entry.total)).map((entry) => ({
			...entry,
			label: entry.label ?? ''
		}))
	);
	const footer = $derived.by(() => {
		const line = footerProp ?? lines.find((entry) => entry.total);
		return line ? { ...line, label: line.label ?? '' } : undefined;
	});

	const signGlyph: Record<DiffSign, string> = {
		add: '+',
		remove: '-',
		keep: ' '
	};

	function toneOf(sign: DiffSign) {
		if (sign === 'add') {
			return toneClass(palette, 'primary');
		}
		if (sign === 'remove') {
			return toneClass(palette, 'secondary');
		}
		return 'text-foreground';
	}
</script>

{@render children?.()}

{#snippet diffLine(row: DiffRow)}
	{@const sign = row.sign ?? 'keep'}
	{@const tone = toneOf(sign)}
	{@const mark = sign === 'keep' ? toneClass(palette, 'empty') : tone}
	<div class="grid grid-cols-[1.25rem_minmax(0,1fr)_8ch] items-baseline gap-x-3" data-reveal>
		<span aria-hidden="true" class={cn('text-center select-none', mark)}>{signGlyph[sign]}</span>
		<span class={tone}>{row.label}</span>
		<span class={cn('text-right tabular-nums', tone)}>{row.value}</span>
	</div>
{/snippet}

<Graph {title} class={className} {corner}>
	<GraphBody class="flex flex-col gap-3">
		<ul role="list" class="flex flex-col gap-2" {@attach reveal({ stagger: 0.04, amount: 0.4 })}>
			{#each rows as row, index (index)}
				<li>{@render diffLine(row)}</li>
			{/each}
		</ul>
		{#if footer}
			<GraphRule />
			<div {@attach reveal({ stagger: 0.04 })}>
				{@render diffLine(footer)}
			</div>
		{/if}
	</GraphBody>
</Graph>
