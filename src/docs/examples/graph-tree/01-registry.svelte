<!-- registry -->
<script lang="ts">
	import { GraphTree, Node } from '$lib/registry/graph-tree/index.js';
</script>

<GraphTree title="REGISTRY">
	<Node label="src/lib/registry">
		<Node label="graph-frame">
			<Node label="graph.svelte" meta="ui" />
			<Node label="graph-motion.ts" meta="lib" />
		</Node>
		<Node label="graph-tree">
			<Node label="graph-tree.svelte" meta="ui" accent />
		</Node>
	</Node>
</GraphTree>
