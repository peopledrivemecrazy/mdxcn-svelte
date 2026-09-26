<script lang="ts" module>
	export type UptimeStatus = 'ok' | 'degraded' | 'down' | 'empty';
</script>

<script lang="ts">
	import {
		Graph,
		GraphBody,
		GraphTick,
		GraphTrack,
		resolveGlyphs,
		reveal,
		toneClass,
		words,
		type Glyphs,
		type GraphPalette
	} from '$lib/registry/graph-frame/index.js';
	import { cn } from '$lib/utils.js';

	export type GraphUptimeProps = {
		title: string;
		/** `["ok", "down"]` or `"ok ok down"`. ok, degraded, down, or empty. */
		days: readonly UptimeStatus[] | string;
		from?: string;
		to?: string;
		columns?: number;
		glyphs?: Glyphs;
		palette?: GraphPalette;
		corner?: string;
		class?: string;
	};

	let {
		title,
		days: daysProp,
		from,
		to,
		columns = 30,
		glyphs,
		palette,
		corner,
		class: className
	}: GraphUptimeProps = $props();

	const days = $derived(words<UptimeStatus>(daysProp));
	const known = $derived(days.filter((day) => day !== 'empty'));
	const percent = $derived.by(() => {
		const ok = known.filter((day) => day === 'ok').length;
		return known.length === 0 ? 0 : Math.round((ok / known.length) * 100);
	});
	const rows = $derived.by(() => {
		const cols = Math.max(1, columns);
		const out: UptimeStatus[][] = [];
		for (let index = 0; index < days.length; index += cols) {
			out.push(days.slice(index, index + cols));
		}
		return out;
	});
	const mark = $derived.by((): Record<UptimeStatus, string> => {
		const set = resolveGlyphs(glyphs);
		const last = set.length - 1;
		return {
			ok: set[last] ?? '█',
			degraded: set[Math.min(2, last)] ?? '▒',
			down: set[0] ?? '·',
			empty: '-'
		};
	});
	const tone = $derived<Record<UptimeStatus, string>>({
		ok: toneClass(palette, 'primary'),
		degraded: toneClass(palette, 'secondary'),
		down: toneClass(palette, 'empty'),
		empty: toneClass(palette, 'empty')
	});
</script>

<Graph {title} class={className} {corner}>
	<GraphBody class="flex flex-col items-center gap-4">
		<div class="flex scrollbar-graph w-fit max-w-full flex-col gap-4 overflow-x-auto">
			<div
				aria-hidden="true"
				class="flex flex-col gap-1 select-none"
				{@attach reveal({ stagger: 0.05, amount: 0.4 })}
			>
				{#each rows as row, rowIndex (rowIndex)}
					<div data-reveal>
						<GraphTrack class="w-auto justify-start gap-0.5">
							{#each row as day, index (index)}
								<GraphTick class={cn('flex-none', tone[day])}>{mark[day]}</GraphTick>
							{/each}
						</GraphTrack>
					</div>
				{/each}
			</div>
			<div class="flex flex-wrap items-baseline justify-between gap-3">
				<p class={cn('tabular-nums', tone.ok)}>{percent}%</p>
				{#if from || to}
					<p class="flex gap-3 text-graph-muted">
						{#if from}<span>{from}</span>{/if}
						{#if to}<span>{to}</span>{/if}
					</p>
				{/if}
			</div>
		</div>
		<p class="flex flex-wrap justify-center gap-x-4 gap-y-1 text-graph-muted">
			<span><span class={tone.ok}>{mark.ok}</span> up</span>
			<span><span class={tone.degraded}>{mark.degraded}</span> slow</span>
			<span><span class={tone.down}>{mark.down}</span> down</span>
		</p>
		<span class="sr-only"
			>{percent} percent uptime over {known.length} days{from && to
				? `, ${from} to ${to}`
				: ''}</span
		>
	</GraphBody>
</Graph>
