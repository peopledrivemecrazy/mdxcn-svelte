<script lang="ts">
	import { resolve } from '$app/paths';

	import { catalog, CATEGORIES } from '$docs/registry.js';
	import MonoLabel from '$docs/site/mono-label.svelte';

	const groups = CATEGORIES.map((category) => ({
		...category,
		items: catalog.filter((entry) => entry.category === category.id)
	})).filter((group) => group.items.length > 0);
</script>

<svelte:head><title>docs · mdxcn-svelte</title></svelte:head>

<div class="flex flex-col gap-12">
	<header class="flex flex-col gap-3">
		<h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">introduction</h1>
		<p class="max-w-2xl text-lg text-pretty text-muted-foreground">
			Svelte 5 components for figures that sit next to prose: tables, charts, trees, timelines, and
			more, drawn with characters in a dashed frame. A port of
			<a
				class="text-foreground underline decoration-dashed underline-offset-4"
				href="https://mdxcn.dev">mdxcn</a
			> for React.
		</p>
	</header>

	{#each groups as group (group.id)}
		<section class="flex flex-col gap-4">
			<div class="flex flex-col gap-1">
				<MonoLabel>{group.label}</MonoLabel>
				<p class="text-muted-foreground">{group.blurb}</p>
			</div>
			<ul class="grid grid-cols-1 gap-3 sm:grid-cols-2">
				{#each group.items as entry (entry.slug)}
					<li>
						<a
							href={resolve('/docs/[slug]', { slug: entry.slug })}
							class="flex h-full flex-col gap-1 graph-frame p-4 hover:bg-muted/40"
						>
							<span class="font-mono text-foreground">{entry.name}</span>
							<span class="text-pretty text-muted-foreground">{entry.description}</span>
						</a>
					</li>
				{/each}
			</ul>
		</section>
	{/each}
</div>
