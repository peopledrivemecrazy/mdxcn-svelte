<!-- headcount -->
<script lang="ts">
	import { GraphDiff, Line } from '$lib/registry/graph-diff/index.js';
</script>

<GraphDiff title="HEADCOUNT">
	<Line label="start" value="12" />
	<Line label="hired" value="3" sign="add" />
	<Line label="left" value="1" sign="remove" />
	<Line label="now" value="14" total />
</GraphDiff>
