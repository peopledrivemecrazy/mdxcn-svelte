<!-- targets -->
<script lang="ts">
	import { GraphBullet, Target } from '$lib/registry/graph-bullet/index.js';
</script>

<GraphBullet title="BUDGET">
	<Target label="Design" value={42} target={40} />
	<Target label="Motion" value={18} target={24} />
	<Target label="Docs" value={9} target={12} />
</GraphBullet>
