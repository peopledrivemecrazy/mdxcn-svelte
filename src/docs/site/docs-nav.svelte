<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';

	import { cn } from '$lib/utils.js';

	import { catalog, CATEGORIES } from '../registry.js';
	import AccentPicker from './accent-picker.svelte';
	import MonoLabel from './mono-label.svelte';

	let { onnavigate }: { onnavigate?: () => void } = $props();

	const start = [
		{ href: '/docs', label: 'introduction' },
		{ href: '/docs/installation', label: 'installation' },
		{ href: '/docs/comark', label: 'comark' },
		{ href: '/docs/knap', label: 'knap' }
	] as const;

	const groups = $derived(
		CATEGORIES.map((category) => ({
			...category,
			items: catalog.filter((entry) => entry.category === category.id)
		})).filter((group) => group.items.length > 0)
	);
</script>

<div class="flex flex-col gap-8">
	<nav aria-label="Docs" class="flex flex-col gap-8 text-base sm:text-sm">
		<div class="flex flex-col">
			<MonoLabel class="px-4 py-3">get started</MonoLabel>
			<ul class="flex flex-col">
				{#each start as link (link.href)}
					<li>
						<a
							href={resolve(link.href)}
							aria-current={page.url.pathname === resolve(link.href) ? 'page' : undefined}
							class={cn(
								'flex items-center justify-between gap-2 px-4 py-2 text-muted-foreground hover:bg-muted/50 hover:text-foreground',
								page.url.pathname === resolve(link.href) &&
									'bg-muted text-foreground hover:bg-muted'
							)}
							onclick={onnavigate}><span class="min-w-0 truncate">{link.label}</span></a
						>
					</li>
				{/each}
			</ul>
		</div>
		{#each groups as group (group.id)}
			<div class="flex flex-col">
				<MonoLabel class="px-4 py-3">{group.label}</MonoLabel>
				<ul class="flex flex-col">
					{#each group.items as entry (entry.slug)}
						<li>
							<a
								href={resolve('/docs/[slug]', { slug: entry.slug })}
								aria-current={page.url.pathname === resolve('/docs/[slug]', { slug: entry.slug })
									? 'page'
									: undefined}
								class={cn(
									'flex items-center justify-between gap-2 px-4 py-2 text-muted-foreground hover:bg-muted/50 hover:text-foreground',
									page.url.pathname === resolve('/docs/[slug]', { slug: entry.slug }) &&
										'bg-muted text-foreground hover:bg-muted'
								)}
								onclick={onnavigate}><span class="min-w-0 truncate">{entry.title}</span></a
							>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</nav>
	<div class="px-4">
		<AccentPicker />
	</div>
</div>
