<script lang="ts">
	import { registerItem } from '$lib/registry/graph-frame/index.js';

	/** `<Col label="Studio" />`: an option across the top. */
	let { label }: { label: string } = $props();

	registerItem('Col', () => ({ label }));
</script>
