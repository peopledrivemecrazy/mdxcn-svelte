<script lang="ts">
	import { cn } from '$lib/utils.js';

	let { mark = '+' }: { mark?: string } = $props();

	const corner =
		'pointer-events-none absolute z-10 flex size-4 items-center justify-center bg-background font-mono text-sm leading-none text-graph-frame select-none';
</script>

<span aria-hidden="true" class={cn(corner, 'top-0 left-0 -translate-x-1/2 -translate-y-1/2')}
	>{mark}</span
>
<span aria-hidden="true" class={cn(corner, 'top-0 right-0 translate-x-1/2 -translate-y-1/2')}
	>{mark}</span
>
<span aria-hidden="true" class={cn(corner, 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2')}
	>{mark}</span
>
<span aria-hidden="true" class={cn(corner, 'right-0 bottom-0 translate-x-1/2 translate-y-1/2')}
	>{mark}</span
>
