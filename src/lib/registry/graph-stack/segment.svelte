<script lang="ts">
	import { registerItem } from '$lib/registry/graph-frame/index.js';

	import type { StackSegment } from './types.js';

	/** One part of a `<Bar>`: `<Segment value={48} label="js" />`. */
	let { label, value }: StackSegment = $props();

	registerItem('Segment', () => ({ label, value }));
</script>
