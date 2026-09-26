<!-- punchcard — Head and Row children; palette="duo" splits the scale into two hues. -->
<script lang="ts">
	import { GraphHeatmap, Head, Row } from '$lib/registry/graph-heatmap/index.js';
</script>

<GraphHeatmap title="DEPLOYS" palette="duo">
	<Head cells="0 4 8 12 16 20" />
	<Row label="Mon" cells="0 1 4 8 6 1" />
	<Row label="Tue" cells="0 0 5 9 4 2" />
	<Row label="Wed" cells="1 0 6 12 5 1" />
	<Row label="Thu" cells="0 2 4 7 8 3" />
	<Row label="Fri" cells="0 1 3 5 2 0" />
	<Row label="Sat" cells="0 0 1 0 0 0" />
	<Row label="Sun" cells="0 0 0 1 0 0" />
</GraphHeatmap>
