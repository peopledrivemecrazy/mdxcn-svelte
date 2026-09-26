<!-- margin — Delta children; the first row starts the total and the last ends it. -->
<script lang="ts">
	import { Delta, GraphWaterfall } from '$lib/registry/graph-waterfall/index.js';
</script>

<GraphWaterfall title="MARGIN" palette="duo">
	<Delta label="Revenue" value={48} />
	<Delta label="Refunds" value={-6} />
	<Delta label="Hosting" value={-4} />
	<Delta label="Profit" value={38} />
</GraphWaterfall>
