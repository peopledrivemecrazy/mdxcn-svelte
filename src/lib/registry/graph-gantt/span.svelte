<script lang="ts">
	import { registerItem } from '$lib/registry/graph-frame/index.js';

	import type { GanttItem } from './types.js';

	/** `<Span label="build" start={0.2} end={0.75} complete={0.55} />` inside `<GraphGantt>`. */
	let { label, start, end, accent, complete }: GanttItem = $props();

	registerItem('Span', () => ({ label, start, end, accent, complete }));
</script>
