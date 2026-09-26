<script lang="ts">
	import type { Snippet } from 'svelte';

	import { cn } from '$lib/utils.js';

	import SiteCorners, { type Corner } from './site-corners.svelte';

	let {
		class: className,
		corners,
		tone = 'frame',
		children
	}: {
		class?: string;
		corners?: readonly Corner[];
		tone?: 'rail' | 'frame';
		children: Snippet;
	} = $props();
</script>

<div class={cn('relative isolate', tone === 'frame' ? 'graph-frame' : 'site-rail', className)}>
	<SiteCorners {corners} {tone} />
	{@render children()}
</div>
