<script lang="ts">
	import {
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

	export type GraphCountdownProps = {
		title: string;
		to: Date | number | string;
		done?: string;
		caption?: string;
		palette?: GraphPalette;
		corner?: string;
		class?: string;
	};

	let {
		title,
		to,
		done = 'done',
		caption,
		palette,
		corner,
		class: className
	}: GraphCountdownProps = $props();

	const now = new GraphNow();

	const remaining = $derived.by(() => {
		const target = parseInstant(to);
		return now.current == null || !Number.isFinite(target) ? null : target - now.current;
	});
	const finished = $derived(remaining != null && remaining <= 0);
	const value = $derived(remaining == null ? '00:00:00' : finished ? done : formatHms(remaining));
</script>

<Graph {title} class={className} {corner}>
	<GraphBody>
		<div class="flex flex-col gap-2" data-reveal {@attach reveal({ amount: 0.5 })}>
			<p
				class={cn(
					'text-3xl tracking-tight tabular-nums sm:text-4xl',
					finished ? 'text-graph-muted' : toneClass(palette, 'primary')
				)}
			>
				{value}
			</p>
			{#if caption}
				<p class="text-graph-muted">{caption}</p>
			{/if}
		</div>
		<span class="sr-only">{finished ? done : `remaining ${value}`}</span>
	</GraphBody>
</Graph>
