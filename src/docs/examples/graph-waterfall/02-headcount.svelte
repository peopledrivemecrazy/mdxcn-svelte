<!-- headcount — The data form: pass items instead of Delta children. -->
<script lang="ts">
	import { GraphWaterfall } from '$lib/registry/graph-waterfall/index.js';
</script>

<GraphWaterfall
	title="TEAM"
	items={[
		{ label: 'Start', value: 12 },
		{ label: 'Hired', value: 4 },
		{ label: 'Left', value: -2 },
		{ label: 'Now', value: 14 }
	]}
/>
