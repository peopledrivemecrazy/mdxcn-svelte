<!-- review — Open items stay muted. -->
<script lang="ts">
	import { GraphCheck, Task } from '$lib/registry/graph-check/index.js';
</script>

<GraphCheck title="REVIEW">
	<Task done label="title is a sentence" />
	<Task done label="numbers are tabular" />
	<Task label="motion respects reduced" note="check the timer" />
</GraphCheck>
