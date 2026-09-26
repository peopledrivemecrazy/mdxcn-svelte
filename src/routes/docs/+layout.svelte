<script lang="ts">
	import { afterNavigate } from '$app/navigation';

	import DocsNav from '$docs/site/docs-nav.svelte';
	import SiteCorners from '$docs/site/site-corners.svelte';
	import SiteRule from '$docs/site/site-rule.svelte';

	let { children } = $props();
	let menu = $state<HTMLDetailsElement>();

	afterNavigate(() => {
		if (menu) menu.open = false;
	});
</script>

<div class="relative isolate mx-auto flex w-full max-w-6xl min-w-0 flex-col">
	<SiteRule class="left-0" orientation="y" />
	<SiteRule class="right-0" orientation="y" />
	<div class="relative lg:hidden">
		<SiteRule class="bottom-0" />
		<SiteCorners corners={['bl', 'br']} />
		<details bind:this={menu} class="px-4 py-3 sm:px-6">
			<summary class="cursor-pointer font-mono text-foreground">docs</summary>
			<div class="py-4"><DocsNav /></div>
		</details>
	</div>
	<div class="flex min-w-0">
		<aside
			class="sticky top-16 isolate max-h-[calc(100dvh-4rem)] w-64 shrink-0 self-start max-lg:hidden"
		>
			<SiteRule class="right-0" orientation="y" />
			<div class="scrollbar-none max-h-[calc(100dvh-4rem)] overflow-y-auto py-10">
				<DocsNav />
			</div>
		</aside>
		<main id="main" class="min-w-0 flex-1 px-4 py-10 text-base sm:px-6 sm:text-sm lg:px-8">
			{@render children()}
		</main>
	</div>
</div>
