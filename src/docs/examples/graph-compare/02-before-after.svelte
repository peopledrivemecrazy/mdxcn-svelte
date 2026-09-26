<!-- before after -->
<script lang="ts">
	import { GraphCompare, Head, Row } from '$lib/registry/graph-compare/index.js';
</script>

<GraphCompare title="RENDER" accent="This">
	<Head cells="Mermaid | SVG | This" />
	<Row label="Source" cells=".md | .svg | .svelte" />
	<Row label="In git" cells="yes | no | yes" />
	<Row label="Themable" cells="no | no | yes" />
</GraphCompare>
