<script lang="ts">
	import './layout.css';

	import Header from '$docs/site/header.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>mdxcn-svelte</title>
	<meta
		name="description"
		content="Svelte components for ASCII-style tables, charts, and diagrams. A port of mdxcn."
	/>
</svelte:head>

<a href="#main" class="sr-only focus:not-sr-only">skip to content</a>
<Header />
{@render children()}
