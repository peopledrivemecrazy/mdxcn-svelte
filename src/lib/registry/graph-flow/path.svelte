<script lang="ts">
	import { registerItem } from '$lib/registry/graph-frame/index.js';

	import type { FlowNode } from './types.js';

	/**
	 * One row of the flow: `<Path text="tap → **update** → *server syncs*" />`.
	 * Or pass `nodes` directly.
	 */
	let { text, nodes }: { text?: string; nodes?: FlowNode[] } = $props();

	registerItem('Path', () => ({ text, nodes }));
</script>
