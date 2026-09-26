<!-- latency -->
<script lang="ts">
	import { GraphMatrix, Row } from '$lib/registry/graph-matrix/index.js';
</script>

<GraphMatrix title="P95" accent="write" columns="iad sfo nrt">
	<Row label="read" cells="12 18 41" />
	<Row label="write" cells="28 33 67" />
	<Row label="queue" cells="4 6 9" />
</GraphMatrix>
