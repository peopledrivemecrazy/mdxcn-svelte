<!-- quarter — Shorter range. glyphs="ascii" swaps the block characters for .- =#@. -->
<script lang="ts">
	import { GraphActivity } from '$lib/registry/graph-activity/index.js';

	import { activityDays } from './activity-days.js';
</script>

<GraphActivity
	title="SHIPPED"
	weekStartsOn={1}
	glyphs="ascii"
	days={activityDays('2026-06-01', 91)}
	caption="Jun – Aug"
/>
