<!-- coverage — max locks the scale; legend={false} drops the key. -->
<script lang="ts">
	import { GraphHeatmap } from '$lib/registry/graph-heatmap/index.js';
</script>

<GraphHeatmap
	title="TESTS"
	max={10}
	legend={false}
	columns="a b c d"
	rows={[
		{ label: 'auth', values: [10, 8, 4, 2] },
		{ label: 'billing', values: [6, 10, 7, 1] },
		{ label: 'docs', values: [2, 3, 9, 8] }
	]}
/>
