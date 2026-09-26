<script lang="ts">
	import { cn } from '$lib/utils.js';

	let { class: className, orientation = 'x' }: { class?: string; orientation?: 'x' | 'y' } =
		$props();
</script>

<span
	aria-hidden="true"
	class={cn(
		'pointer-events-none absolute z-10',
		orientation === 'x' ? 'inset-x-0 site-rule h-px' : 'inset-y-0 site-rule-y w-px',
		className
	)}
></span>
