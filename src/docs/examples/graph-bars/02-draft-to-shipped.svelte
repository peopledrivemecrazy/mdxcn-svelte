<!-- draft to shipped -->
<script lang="ts">
	import { GraphBars, Series } from '$lib/registry/graph-bars/index.js';
</script>

<GraphBars title="DRAFT TO SHIPPED" processor="edit">
	<Series label="draft" values="1 2 2 3 1" />
	<Series label="shipped" values="3 5 4 6 5" size="lg" />
</GraphBars>
