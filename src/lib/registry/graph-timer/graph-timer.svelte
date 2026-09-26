<script lang="ts" module>
	export type TimerKind = 'elapsed' | 'ago' | 'clock';
</script>

<script lang="ts">
	import {
		formatAgo,
		formatClock,
		formatHms,
		Graph,
		GraphBody,
		GraphNow,
		parseInstant,
		reveal,
		toneClass,
		type GraphPalette
	} from '$lib/registry/graph-frame/index.js';
	import { cn } from '$lib/utils.js';

	export type GraphTimerProps = {
		title: string;
		kind?: TimerKind;
		at?: Date | number | string;
		caption?: string;
		palette?: GraphPalette;
		corner?: string;
		class?: string;
	};

	let {
		title,
		kind = 'elapsed',
		at,
		caption,
		palette,
		corner,
		class: className
	}: GraphTimerProps = $props();

	const now = new GraphNow();

	const reading = $derived.by(() => {
		const current = now.current;
		const origin = at == null ? Number.NaN : parseInstant(at);
		const placeholder = { value: kind === 'ago' ? '0s ago' : '00:00:00', spoken: 'timer' };

		if (current == null) {
			return placeholder;
		}

		if (kind === 'clock') {
			const value = formatClock(current);
			return { value, spoken: `local time ${value}` };
		}

		if (!Number.isFinite(origin)) {
			return placeholder;
		}

		const elapsed = Math.max(0, current - origin);
		if (kind === 'ago') {
			const value = formatAgo(elapsed);
			return { value, spoken: value };
		}

		const value = formatHms(elapsed);
		return { value, spoken: `elapsed ${value}` };
	});
</script>

<Graph {title} class={className} {corner}>
	<GraphBody>
		<div class="flex flex-col gap-2" data-reveal {@attach reveal({ amount: 0.5 })}>
			<p
				class={cn(
					'text-3xl tracking-tight tabular-nums sm:text-4xl',
					toneClass(palette, 'primary')
				)}
			>
				{reading.value}
			</p>
			{#if caption}
				<p class="text-graph-muted">{caption}</p>
			{/if}
		</div>
		<span class="sr-only">{reading.spoken}</span>
	</GraphBody>
</Graph>
