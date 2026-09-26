<script lang="ts">
	import { Markdown } from '@comark/svelte';

	import { graphComponents } from '$lib/registry/graph-comark/index.js';
	import CodeBlock from '$docs/site/code-block.svelte';
	import FrameBox from '$docs/site/frame-box.svelte';
	import MonoLabel from '$docs/site/mono-label.svelte';

	import { setup, source, ssr } from './source.js';

	let { data } = $props();
</script>

<svelte:head><title>comark · mdxcn-svelte</title></svelte:head>

<article class="flex max-w-3xl flex-col gap-12">
	<header class="flex flex-col gap-3">
		<h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">comark</h1>
		<p class="text-lg text-pretty text-muted-foreground">
			Render graphs from plain Markdown at runtime. <a
				class="text-foreground underline decoration-dashed underline-offset-4"
				href="https://comark.dev">Comark</a
			>
			parses <code class="font-mono text-foreground">::graph-*</code> blocks with YAML props, and
			<code class="font-mono text-foreground">@comark/svelte</code> renders them with these components.
			Good for CMS content and streamed AI output.
		</p>
	</header>

	<section class="flex flex-col gap-3">
		<MonoLabel>01 · install</MonoLabel>
		<CodeBlock code="bun add mdxcn-svelte comark @comark/svelte" />
	</section>

	<section class="flex flex-col gap-3">
		<MonoLabel>02 · render</MonoLabel>
		<p class="text-pretty text-muted-foreground">
			<code class="font-mono text-foreground">graphComponents</code> maps every tag. For a subset,
			<code class="font-mono text-foreground"
				>createGraphComponents(&#123; 'graph-table': GraphTable &#125;)</code
			>. Numbers written as strings are coerced, and a block waits in a pending frame until its
			required props arrive.
		</p>
		<CodeBlock code={setup} />
		<p class="text-pretty text-muted-foreground">
			<code class="font-mono text-foreground">&lt;Markdown&gt;</code> parses in an effect, so pass a parsed
			document to get server-rendered figures:
		</p>
		<CodeBlock code={ssr} />
	</section>

	<section class="flex flex-col gap-3">
		<MonoLabel>03 · write</MonoLabel>
		<CodeBlock code={source} label="Copy Markdown" />
		<FrameBox class="min-w-0 overflow-visible bg-muted/25 p-2 sm:p-3" tone="rail">
			<div
				class="px-3 py-6 sm:px-4 [&_figure]:my-8 [&_h2]:mb-2 [&_h2]:text-xl [&_h2]:font-semibold [&_p]:text-muted-foreground"
			>
				<Markdown value={data.doc} components={graphComponents} />
			</div>
		</FrameBox>
	</section>
</article>
