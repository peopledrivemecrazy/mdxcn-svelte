<script lang="ts">
	import type { Example } from '../registry.js';

	import CodeBlock from './code-block.svelte';
	import FrameBox from './frame-box.svelte';
	import MonoLabel from './mono-label.svelte';

	let { example }: { example: Example } = $props();
</script>

<section class="flex flex-col gap-4" id={example.file}>
	<div class="flex min-w-0 flex-col gap-1">
		<h2 class="text-xl font-semibold tracking-tight text-balance">{example.title}</h2>
		{#if example.description}
			<p class="text-pretty text-muted-foreground">{example.description}</p>
		{/if}
	</div>

	<FrameBox class="min-w-0 overflow-visible bg-muted/25 p-2 sm:p-3" tone="rail">
		<div class="graph-scroll-x min-h-44 px-3 py-4 sm:min-h-48 sm:px-4 sm:py-5">
			<example.component />
		</div>
	</FrameBox>

	<div class="flex min-w-0 flex-col gap-2">
		<MonoLabel>.svelte</MonoLabel>
		<CodeBlock code={example.code} label="Copy Svelte" />
	</div>
</section>
