<!-- week — accent highlights a row without dimming the rest. -->
<script lang="ts">
	import { GraphGantt, Span } from '$lib/registry/graph-gantt/index.js';
</script>

<GraphGantt title="THIS WEEK" columns={20} ticks={['mon', 'wed', 'fri']}>
	<Span label="rfc" start={0} end={0.4} accent />
	<Span label="patch" start={0.35} end={0.8} />
	<Span label="review" start={0.7} end={1} />
</GraphGantt>
