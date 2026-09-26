<script lang="ts">
	import CodeBlock from '$docs/site/code-block.svelte';
	import MonoLabel from '$docs/site/mono-label.svelte';

	import { context, setup, template } from './source.js';

	let { data } = $props();
</script>

<svelte:head><title>knap · mdxcn-svelte</title></svelte:head>

<article class="flex max-w-3xl flex-col gap-12">
	<header class="flex flex-col gap-3">
		<h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">knap</h1>
		<p class="text-lg text-pretty text-muted-foreground">
			Generate Markdown from data. <code class="font-mono text-foreground">graph_*</code> filters
			pipe the same props the components take and emit a framed ASCII fence that reads anywhere: a
			README, a PR comment, a terminal. Graphs without an ASCII form emit a
			<code class="font-mono text-foreground">::graph-*</code> block for comark. Framework-free: this
			entry point has no Svelte in it.
		</p>
	</header>

	<section class="flex flex-col gap-3">
		<MonoLabel>01 · wire the filters</MonoLabel>
		<CodeBlock code={setup} />
	</section>

	<section class="flex flex-col gap-3">
		<MonoLabel>02 · template and data</MonoLabel>
		<CodeBlock code={template} />
		<CodeBlock code={JSON.stringify(context, null, 2)} />
	</section>

	<section class="flex flex-col gap-3">
		<MonoLabel>03 · output</MonoLabel>
		<CodeBlock code={data.output} label="Copy Markdown" />
	</section>
</article>
