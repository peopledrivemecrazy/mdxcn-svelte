<script lang="ts">
	import { examplesFor, getEntry } from '$docs/registry.js';
	import CodeBlock from '$docs/site/code-block.svelte';
	import MonoLabel from '$docs/site/mono-label.svelte';
	import Preview from '$docs/site/preview.svelte';
	import PropsTable from '$docs/site/props-table.svelte';

	let { data } = $props();

	const entry = $derived(getEntry(data.slug)!);
	const examples = $derived(examplesFor(data.slug));
	const importLine = $derived(`import { ${entry.exports.join(', ')} } from '${entry.importPath}';`);
</script>

<svelte:head>
	<title>{entry.title} · mdxcn-svelte</title>
	<meta name="description" content={entry.description} />
</svelte:head>

<article class="flex flex-col gap-16">
	<header class="flex flex-col gap-3">
		<p class="font-mono text-graph-accent">{entry.category}</p>
		<h1 class="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{entry.title}</h1>
		<p class="max-w-2xl text-lg text-pretty text-muted-foreground">{entry.description}</p>
		<div class="max-w-2xl pt-2">
			<CodeBlock code={importLine} label="Copy import" />
		</div>
	</header>

	{#each examples as example (example.file)}
		<Preview {example} />
	{/each}

	<section class="flex flex-col gap-6">
		<MonoLabel>api</MonoLabel>
		<PropsTable rows={entry.props} title={entry.name} />
		{#each entry.items ?? [] as item (item.name)}
			<div class="flex flex-col gap-3">
				<p class="text-pretty text-muted-foreground">{item.description}</p>
				<PropsTable rows={item.props} title={item.name} />
			</div>
		{/each}
	</section>
</article>
