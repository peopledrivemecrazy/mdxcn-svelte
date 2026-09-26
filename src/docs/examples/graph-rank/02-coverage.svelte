<!-- coverage -->
<script lang="ts">
	import { GraphRank } from '$lib/registry/graph-rank/index.js';
</script>

<GraphRank
	title="COVERAGE"
	max={100}
	items={[
		{ label: 'frame', value: 100, display: '100%' },
		{ label: 'plot', value: 82, display: '82%' },
		{ label: 'invoice', value: 41, display: '41%' }
	]}
/>
