<script lang="ts">
	import { registerItem } from '$lib/registry/graph-frame/index.js';

	import type { FunnelStep } from './types.js';

	/** `<Stage value={860} display="860" label="ship" />` inside `<GraphFunnel>`. */
	let { label, value, display }: FunnelStep = $props();

	registerItem('Stage', () => ({ label, value, display }));
</script>
