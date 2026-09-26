<!-- signup — Narrower track. Percent is of the first step. -->
<script lang="ts">
	import { GraphFunnel, Stage } from '$lib/registry/graph-funnel/index.js';
</script>

<GraphFunnel title="SIGNUP" ticks={16}>
	<Stage value="8,000" label="visit" />
	<Stage value="2,400" label="start" />
	<Stage value="960" label="verify" />
	<Stage value="180" label="paid" />
</GraphFunnel>
