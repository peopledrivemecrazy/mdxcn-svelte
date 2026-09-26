<!-- latency — A hint line under each label carries the delta. -->
<script lang="ts">
	import { GraphStat, Stat } from '$lib/registry/graph-stat/index.js';
</script>

<GraphStat title="P95">
	<Stat value="142ms" label="read" hint="−18ms" />
	<Stat value="410ms" label="write" hint="+22ms" accent />
</GraphStat>
