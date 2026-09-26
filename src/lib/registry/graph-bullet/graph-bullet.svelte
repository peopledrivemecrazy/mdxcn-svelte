<script lang="ts">
	import type { Snippet } from 'svelte';

	import {
		Graph,
		GraphBody,
		GraphTick,
		GraphTrack,
		numberOf,
		provideItems,
		reveal,
		toneClass,
		trackMarks,
		type Glyphs,
		type GraphPalette
	} from '$lib/registry/graph-frame/index.js';

	import type { BulletItem } from './target.svelte';

	export type GraphBulletProps = {
		title: string;
		/** Data form. Or write `<Target />` children. */
		items?: readonly BulletItem[];
		children?: Snippet;
		ticks?: number;
		glyphs?: Glyphs;
		palette?: GraphPalette;
		corner?: string;
		class?: string;
	};

	let {
		title,
		items: itemsProp,
		children,
		ticks = 20,
		glyphs,
		palette,
		corner,
		class: className
	}: GraphBulletProps = $props();

	const registry = provideItems();

	function format(value: number) {
		return value.toLocaleString('en-US', {
			maximumFractionDigits: Number.isInteger(value) ? 0 : 1
		});
	}

	const rows = $derived(
		(itemsProp ?? registry.list<BulletItem>('Target')).map((entry) => {
			const value = numberOf(entry.value);
			const target = entry.target == null ? undefined : numberOf(entry.target);
			const max = entry.max == null ? undefined : numberOf(entry.max);
			const peak = max ?? Math.max(value, target ?? 0, 1);
			const filled = Math.min(ticks, Math.round((Math.max(value, 0) / peak) * ticks));
			const mark =
				target == null
					? null
					: Math.min(ticks - 1, Math.max(0, Math.round((Math.max(target, 0) / peak) * ticks)));
			const shown =
				entry.display ?? (target == null ? format(value) : `${format(value)} / ${format(target)}`);
			return { label: entry.label ?? '', filled, mark, shown };
		})
	);
	const marks = $derived(trackMarks(glyphs, { empty: '-', rest: '=', fill: '=' }));

	function tickClass(index: number, filled: number, mark: number | null) {
		if (mark != null && index === mark) {
			return toneClass(palette, 'secondary');
		}
		if (index < filled) {
			return mark != null && index > mark
				? toneClass(palette, 'secondary')
				: toneClass(palette, 'primary');
		}
		return 'text-graph-frame';
	}
</script>

{@render children?.()}

<Graph {title} class={className} {corner}>
	<GraphBody class="flex flex-col gap-3">
		<ul
			class="flex w-full flex-col gap-2"
			role="list"
			{@attach reveal({ stagger: 0.05, amount: 0.4 })}
		>
			{#each rows as row, rowIndex (rowIndex)}
				<li
					aria-label={`${row.label} ${row.shown}`}
					class="grid grid-cols-[minmax(0,7rem)_minmax(0,1fr)_minmax(0,7rem)] items-center gap-x-2 sm:gap-x-4"
					data-reveal
				>
					<span class="truncate text-foreground">{row.label}</span>
					<span class="flex min-w-0 items-center">
						<span aria-hidden="true" class="text-graph-frame">[</span>
						<GraphTrack>
							{#each { length: ticks }, index (index)}
								{@const glyph =
									row.mark != null && index === row.mark
										? '|'
										: index < row.filled
											? marks.fill
											: marks.empty}
								<GraphTick class={tickClass(index, row.filled, row.mark)}>{glyph}</GraphTick>
							{/each}
						</GraphTrack>
						<span aria-hidden="true" class="text-graph-frame">]</span>
					</span>
					<span class="text-right text-graph-muted tabular-nums">{row.shown}</span>
				</li>
			{/each}
		</ul>
	</GraphBody>
</Graph>
