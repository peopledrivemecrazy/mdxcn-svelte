<!-- capacity -->
<script lang="ts">
	import { GraphBullet } from '$lib/registry/graph-bullet/index.js';
</script>

<GraphBullet
	title="LOAD"
	items={[
		{ label: 'CPU', value: 72, target: 80, max: 100 },
		{ label: 'RAM', value: 34, target: 64, max: 100 },
		{ label: 'SSD', value: 91, target: 90, max: 100 }
	]}
/>
