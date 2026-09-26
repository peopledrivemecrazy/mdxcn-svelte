<script lang="ts">
	import { onMount } from 'svelte';

	import { cn } from '$lib/utils.js';

	import { accents, applyAccent, DEFAULT_ACCENT_ID } from '../accent.js';
	import MonoLabel from './mono-label.svelte';

	let current = $state(DEFAULT_ACCENT_ID);

	onMount(() => {
		current = document.documentElement.dataset.accent ?? DEFAULT_ACCENT_ID;
	});

	function pick(id: string) {
		current = id;
		applyAccent(id);
	}
</script>

<div class="flex flex-col gap-3">
	<MonoLabel>accent</MonoLabel>
	<div class="grid grid-cols-7 gap-2" role="radiogroup" aria-label="Accent">
		{#each accents as accent (accent.id)}
			<button
				type="button"
				role="radio"
				aria-checked={current === accent.id}
				aria-label={accent.id}
				title={accent.id}
				class={cn(
					'size-5 outline-offset-2',
					current === accent.id && 'outline-1 outline-foreground outline-dashed'
				)}
				style="background: {accent.swatch}"
				onclick={() => pick(accent.id)}
			></button>
		{/each}
	</div>
	<p class="font-mono text-xs text-muted-foreground">{current}</p>
</div>
