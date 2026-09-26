<!-- launch — A note sits under its row. -->
<script lang="ts">
	import { GraphCheck, Task } from '$lib/registry/graph-check/index.js';
</script>

<GraphCheck title="LAUNCH">
	<Task done label="freeze tokens" />
	<Task done label="ship registry json" />
	<Task label="write the postmortem" note="still open" />
</GraphCheck>
