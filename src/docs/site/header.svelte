<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';

	import SiteCorners from './site-corners.svelte';
	import SiteRule from './site-rule.svelte';
	import ThemeToggle from './theme-toggle.svelte';

	const docs = $derived(page.url.pathname.startsWith('/docs'));
</script>

<header class="sticky top-0 z-40 bg-background/40 backdrop-blur-sm">
	<SiteRule class="bottom-0 z-20" />
	<div class="relative isolate mx-auto w-full max-w-6xl min-w-0 px-4 sm:px-6 lg:px-8">
		<SiteRule class="left-0 z-20" orientation="y" />
		<SiteRule class="right-0 z-20" orientation="y" />
		<SiteCorners />
		{#if docs}
			<SiteCorners corners={['bl']} class="left-64 max-lg:hidden" />
		{/if}
		<div class="flex items-center justify-between gap-4 py-4">
			<div class="flex items-center gap-4">
				<a href={resolve('/')} class="flex shrink-0 items-center gap-2 font-mono text-foreground">
					<span class="text-graph-accent">+</span>mdxcn-svelte
				</a>
				<nav aria-label="Primary" class="max-sm:hidden">
					<ul class="flex items-center gap-4">
						<li>
							<a class="text-muted-foreground hover:text-foreground" href={resolve('/docs')}>docs</a
							>
						</li>
						<li>
							<a
								class="text-muted-foreground hover:text-foreground"
								href={resolve('/docs/installation')}>install</a
							>
						</li>
						<li>
							<a class="text-muted-foreground hover:text-foreground" href={resolve('/docs/comark')}
								>comark</a
							>
						</li>
					</ul>
				</nav>
			</div>
			<ThemeToggle />
		</div>
	</div>
</header>
