<!-- errors — Line only. progress reveals a prefix. -->
<script lang="ts">
	import { GraphPlot } from '$lib/registry/graph-plot/index.js';
</script>

<GraphPlot
	title="ERRORS"
	variant="line"
	height={5}
	progress={0.7}
	data={[1, 1, 4, 2, 8, 3, 2, 1, 5, 2]}
	labels={['mon', 'fri']}
/>
