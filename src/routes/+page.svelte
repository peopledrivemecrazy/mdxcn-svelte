<script lang="ts">
	import { resolve } from '$app/paths';

	import { examplesFor } from '$docs/registry.js';
	import CodeBlock from '$docs/site/code-block.svelte';
	import SiteRule from '$docs/site/site-rule.svelte';

	const demos = [
		'graph-table',
		'graph-meter',
		'graph-spark',
		'graph-tree',
		'graph-activity',
		'graph-flow'
	]
		.map((slug) => examplesFor(slug)[0])
		.filter(Boolean);
</script>

<main id="main" class="relative isolate mx-auto flex w-full max-w-6xl min-w-0 flex-col">
	<SiteRule class="left-0" orientation="y" />
	<SiteRule class="right-0" orientation="y" />

	<section class="flex flex-col gap-6 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
		<p class="font-mono text-graph-accent">mdxcn, for svelte</p>
		<h1 class="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
			ASCII tables, charts, and diagrams for Svelte 5.
		</h1>
		<p class="max-w-2xl text-lg text-pretty text-muted-foreground">
			Each figure sits in a dashed frame with its title on the top edge. Glyphs do the drawing, one
			accent colors it, and Tailwind styles it. Works in SvelteKit, mdsvex, and Comark Markdown.
		</p>
		<div class="flex flex-wrap items-center gap-4">
			<a
				href={resolve('/docs/installation')}
				class="bg-foreground px-4 py-2 font-mono text-background hover:opacity-90">install</a
			>
			<a
				href={resolve('/docs')}
				class="px-4 py-2 font-mono text-foreground underline decoration-dashed underline-offset-4"
				>browse components</a
			>
		</div>
		<div class="max-w-xl">
			<CodeBlock code="bun add mdxcn-svelte" label="Copy install command" />
		</div>
	</section>

	<div class="relative"><SiteRule class="top-0" /></div>

	<section class="grid grid-cols-1 gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
		{#each demos as demo (demo.slug)}
			<a
				href={resolve('/docs/[slug]', { slug: demo.slug })}
				class="block min-w-0"
				aria-label="{demo.slug} docs"
			>
				<demo.component />
			</a>
		{/each}
	</section>
</main>
