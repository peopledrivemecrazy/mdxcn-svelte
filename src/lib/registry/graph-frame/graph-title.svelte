<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import { cn } from '$lib/utils.js';

	let {
		class: className,
		children,
		...rest
	}: HTMLAttributes<HTMLElement> & { children?: Snippet } = $props();
</script>

<!-- svelte-ignore a11y_figcaption_parent -->
<figcaption
	class={cn(
		'absolute top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 bg-background px-2.5 tracking-wide whitespace-nowrap uppercase',
		className
	)}
	{...rest}
>
	<span class="graph-title-ink text-graph-accent">[ {@render children?.()} ]</span>
</figcaption>
