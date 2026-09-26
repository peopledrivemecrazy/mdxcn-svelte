<!-- registry -->
<script lang="ts">
	import { GraphTree, Node } from '$lib/registry/graph-tree/index.js';
</script>

<GraphTree title="REGISTRY">
	<Node label="registry/default" accent>
		<Node label="graph-frame">
			<Node label="graph-frame.tsx" meta="ui" />
			<Node label="graph-motion.ts" meta="lib" />
		</Node>
		<Node label="graph-tree" accent>
			<Node label="graph-tree.tsx" meta="ui" accent />
		</Node>
	</Node>
</GraphTree>
