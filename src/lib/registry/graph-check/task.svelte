<script lang="ts">
	import { registerItem } from '$lib/registry/graph-frame/index.js';

	import type { CheckItem } from './types.js';

	/** `<Task done label="ship registry json" />` inside `<GraphCheck>`. */
	let { label, done, note }: CheckItem = $props();

	registerItem('Task', () => ({ label, done, note }));
</script>
