<!-- traffic -->
<script lang="ts">
	import { GraphSlope, Slope } from '$lib/registry/graph-slope/index.js';
</script>

<GraphSlope title="TRAFFIC" palette="duo" fromLabel="2025" toLabel="2026">
	<Slope label="docs" from="8,200" to="12,400" />
	<Slope label="copy" from="5,100" to="4,100" />
	<Slope label="ship" from={640} to={860} />
</GraphSlope>
