<!-- rfc -->
<script lang="ts">
	import { GraphSheet, Head, Row, Section } from '$lib/registry/graph-sheet/index.js';
</script>

<GraphSheet title="RFC">
	<Head cells="Item | Owner | Status" />
	<Section title="Scope">
		<Row cells="CLI copies files | priya | done" />
		<Row cells="Docs previews | jon | now" />
	</Section>
	<Section title="Out of scope">
		<Row cells="npm package | — | later" />
		<Row cells="Figma kit | — | later" />
	</Section>
</GraphSheet>
