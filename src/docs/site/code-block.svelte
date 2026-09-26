<script lang="ts">
	import CopyButton from './copy-button.svelte';
	import FrameBox from './frame-box.svelte';

	let { code, label = 'Copy code' }: { code: string; label?: string } = $props();
</script>

<FrameBox class="min-w-0 overflow-visible" tone="rail">
	<div class="absolute top-2 right-2 z-20">
		<CopyButton text={code} {label} />
	</div>
	<pre
		class="scrollbar-graph max-h-128 overflow-auto p-3 pr-16 font-mono text-sm text-muted-foreground sm:p-4 sm:pr-16"><code
			>{code}</code
		></pre>
</FrameBox>
