<!-- launch — A playhead marks today. complete fills part of a bar. -->
<script lang="ts">
	import { GraphGantt, Span } from '$lib/registry/graph-gantt/index.js';
</script>

<GraphGantt title="LAUNCH" stage="build" progress={0.58} ticks={['q1', 'q2', 'q3', 'q4']}>
	<Span label="design" start={0} end={0.35} complete={1} />
	<Span label="build" start={0.2} end={0.75} complete={0.55} accent />
	<Span label="docs" start={0.55} end={0.9} complete={0.2} />
	<Span label="ship" start={0.85} end={1} />
</GraphGantt>
