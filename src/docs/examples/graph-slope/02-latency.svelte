<!-- latency -->
<script lang="ts">
	import { GraphSlope } from '$lib/registry/graph-slope/index.js';
</script>

<GraphSlope
	title="P95"
	fromLabel="before"
	toLabel="after"
	items={[
		{ label: 'read', from: 160, to: 142 },
		{ label: 'write', from: 388, to: 410 },
		{ label: 'cache', from: 12, to: 12 }
	]}
/>
