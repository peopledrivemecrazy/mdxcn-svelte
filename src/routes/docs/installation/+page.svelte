<script lang="ts">
	import CodeBlock from '$docs/site/code-block.svelte';
	import MonoLabel from '$docs/site/mono-label.svelte';

	import { steps } from './steps.js';
</script>

<svelte:head><title>installation · mdxcn-svelte</title></svelte:head>

<article class="flex max-w-3xl flex-col gap-12">
	<header class="flex flex-col gap-3">
		<h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">installation</h1>
		<p class="text-lg text-pretty text-muted-foreground">
			An npm package of Svelte 5 components styled with Tailwind v4. Sources are plain
			<code class="font-mono text-foreground">.svelte</code> files, so copying a folder out of
			<code class="font-mono text-foreground">src/lib/registry</code> works too.
		</p>
	</header>

	<ol class="flex flex-col gap-10">
		{#each steps as step, index (step.title)}
			<li class="flex flex-col gap-3">
				<MonoLabel>{String(index + 1).padStart(2, '0')} · {step.title}</MonoLabel>
				<p class="text-pretty text-muted-foreground">{step.body}</p>
				<CodeBlock code={step.code} />
			</li>
		{/each}
	</ol>
</article>
