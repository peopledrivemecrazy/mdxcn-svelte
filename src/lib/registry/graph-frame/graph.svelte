<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import { cn } from '$lib/utils.js';

	import GraphCorners from './graph-corners.svelte';
	import GraphTitle from './graph-title.svelte';

	type Props = HTMLAttributes<HTMLElement> & {
		title?: string;
		corner?: string;
		children?: Snippet;
	};

	let { title, corner = '+', class: className, children, ...rest }: Props = $props();

	const captionId = $props.id();
</script>

<figure
	aria-labelledby={title ? captionId : undefined}
	class={cn('relative w-full min-w-0 graph-frame font-mono text-sm text-foreground', className)}
	{...rest}
>
	{#if title}
		<GraphTitle id={captionId}>{title}</GraphTitle>
	{/if}
	<GraphCorners mark={corner} />
	{@render children?.()}
</figure>
