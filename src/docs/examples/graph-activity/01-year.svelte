<!-- year — Dated counts. The grid, month labels, and intensity scale are derived. -->
<script lang="ts">
	import { GraphActivity } from '$lib/registry/graph-activity/index.js';

	import { activityDays } from './activity-days.js';
</script>

<GraphActivity title="COMMITS" days={activityDays('2025-09-01', 371)} />
