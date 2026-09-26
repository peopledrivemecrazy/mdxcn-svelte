<!-- bundle -->
<script lang="ts">
	import { GraphDiff, Line } from '$lib/registry/graph-diff/index.js';
</script>

<GraphDiff title="BUNDLE" palette="duo">
	<Line label="vendor" value="84 kb" />
	<Line label="app" value="31 kb" sign="add" />
	<Line label="sourcemaps" value="12 kb" sign="remove" />
	<Line label="shipped" value="103 kb" total />
</GraphDiff>
