<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import { cn } from '$lib/utils.js';

	let {
		class: className,
		children,
		...rest
	}: HTMLAttributes<HTMLSpanElement> & { children?: Snippet } = $props();
</script>

<span aria-hidden="true" class={cn('flex w-full min-w-0 select-none', className)} {...rest}>{@render children?.()}</span>
