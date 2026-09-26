<script lang="ts">
	import {
		fillDelay,
		reveal,
		toneClass,
		type GraphPalette
	} from '$lib/registry/graph-frame/index.js';
	import { cn } from '$lib/utils.js';

	let {
		values,
		height,
		delay = 0,
		tone = 'accent',
		fill,
		palette
	}: {
		values: number[];
		height: number;
		delay?: number;
		tone?: 'accent' | 'muted';
		fill: string;
		palette?: GraphPalette;
	} = $props();

	const max = $derived(Math.max(...values, 1));
	const onClass = $derived(
		tone === 'accent' ? toneClass(palette, 'primary') : toneClass(palette, 'secondary')
	);
</script>

<div
	class="flex items-end gap-1"
	{@attach reveal({ y: 0, delayOf: (element) => Number(element.dataset.delay ?? 0) })}
>
	{#each values as value, index (index)}
		{@const level = Math.round((value / max) * (height - 1))}
		<span class="flex w-[1ch] flex-col justify-end">
			{#each { length: height }, row (row)}
				{@const on = height - 1 - row <= level}
				{#if on}
					<span
						class={cn('h-[1em] w-full text-center', onClass)}
						data-reveal
						data-delay={delay + fillDelay(false, index, 0.03)}>{fill}</span
					>
				{:else}
					<span class="h-[1em] w-full text-center text-transparent"></span>
				{/if}
			{/each}
		</span>
	{/each}
</div>
