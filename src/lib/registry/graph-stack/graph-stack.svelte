<script lang="ts">
	import type { Snippet } from 'svelte';

	import {
		Graph,
		GraphBody,
		GraphTick,
		GraphTrack,
		isMonoPalette,
		provideItems,
		resolveGlyphs,
		reveal,
		seriesClass,
		seriesDim,
		type Glyphs,
		type GraphPalette
	} from '$lib/registry/graph-frame/index.js';

	import { segmentsOf, type SegmentRow, type StackRow, type StackSegment } from './types.js';

	const DEFAULT_GLYPHS = ['█', '▓', '▒', '░', '#', '=', '+', '-'];

	export type GraphStackProps = {
		title: string;
		/** Data form. Or write `<Bar>` children with `<Segment>` inside. */
		rows?: readonly StackRow[];
		children?: Snippet;
		accent?: string;
		ticks?: number;
		glyphs?: Glyphs;
		palette?: GraphPalette;
		corner?: string;
		class?: string;
	};

	let {
		title,
		rows: rowsProp,
		children,
		accent,
		ticks = 24,
		glyphs,
		palette,
		corner,
		class: className
	}: GraphStackProps = $props();

	const bars = provideItems();

	type BarRow = { label: string; segments: SegmentRow[] };
	type Painted = { label: string; glyph: string; count: number; accent: boolean };

	const set = $derived(glyphs == null ? DEFAULT_GLYPHS : resolveGlyphs(glyphs));
	const rows = $derived.by<BarRow[]>(() => {
		if (rowsProp) {
			return rowsProp.map((row) => ({ label: row.label, segments: segmentsOf(row.segments) }));
		}

		return bars
			.list<StackRow & { nested: StackSegment[] }>('Bar')
			.map((row) => ({ label: row.label, segments: segmentsOf(row.segments, row.nested) }));
	});
	const legend = $derived.by(() => {
		const labels: string[] = [];
		for (const row of rows) {
			for (const segment of row.segments) {
				if (!labels.includes(segment.label)) {
					labels.push(segment.label);
				}
			}
		}
		return labels;
	});

	function paintRow(segments: SegmentRow[]): Painted[] {
		const total = segments.reduce((sum, segment) => sum + segment.value, 0) || 1;
		let left = ticks;

		return segments.map((segment, index) => {
			const raw = Math.round((segment.value / total) * ticks);
			const count =
				index === segments.length - 1 ? Math.max(0, left) : Math.min(Math.max(0, raw), left);
			left -= count;

			return {
				label: segment.label,
				glyph: set[index % set.length] ?? '█',
				count,
				accent: accent ? segment.label === accent : index === 0
			};
		});
	}

	function describe(row: BarRow) {
		return `${row.label}: ${row.segments.map((segment) => `${segment.label} ${segment.value}`).join(', ')}`;
	}
</script>

{@render children?.()}

<Graph {title} class={className} {corner}>
	<GraphBody class="flex flex-col gap-6">
		<ul class="flex flex-col gap-3" role="list" {@attach reveal({ stagger: 0.05, amount: 0.4 })}>
			{#each rows as row, rowIndex (rowIndex)}
				<li
					aria-label={describe(row)}
					class="grid grid-cols-[minmax(0,7rem)_minmax(0,1fr)] items-center gap-x-2 sm:gap-x-4"
					data-reveal
				>
					<span class="truncate text-foreground">{row.label}</span>
					<GraphTrack>
						{#each paintRow(row.segments) as piece, pieceIndex (pieceIndex)}
							{#each { length: piece.count }, index (index)}
								<GraphTick
									class={seriesClass(palette, legend.indexOf(piece.label))}
									style={seriesDim(palette, isMonoPalette(palette) ? piece.accent : true)}
								>
									{piece.glyph}
								</GraphTick>
							{/each}
						{/each}
					</GraphTrack>
				</li>
			{/each}
		</ul>
		<ul class="flex flex-wrap gap-x-4 gap-y-1" role="list">
			{#each legend as label, index (label)}
				{@const highlighted = isMonoPalette(palette)
					? accent
						? label === accent
						: index === 0
					: true}
				<li class="flex items-center gap-2" style={seriesDim(palette, highlighted)}>
					<span aria-hidden="true" class={seriesClass(palette, index)}>
						{set[index % set.length] ?? '█'}
					</span>
					<span class={highlighted ? 'text-foreground' : 'text-graph-muted'}>{label}</span>
				</li>
			{/each}
		</ul>
	</GraphBody>
</Graph>
