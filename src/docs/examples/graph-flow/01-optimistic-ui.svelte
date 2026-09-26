<!-- optimistic ui -->
<script lang="ts">
	import { GraphFlow, Path } from '$lib/registry/graph-flow/index.js';
</script>

<GraphFlow title="OPTIMISTIC UI">
	<Path text="tap → server → update" />
	<Path text="tap → **update** → *server syncs*" />
</GraphFlow>
